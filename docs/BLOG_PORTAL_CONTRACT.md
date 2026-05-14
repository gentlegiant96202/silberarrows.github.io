# SilberArrows Blog – Portal Contract

This document is the source of truth for how the **portal app**
(`portal.silberarrows.com`, separate codebase) must talk to the
**marketing site** (`mercedes-benz.silberarrows.com`, this repo) for blog
content. Anything in here is already implemented on the marketing side and
must be mirrored on the portal side.

---

## 1. Shared backend

Both apps share **one Supabase project for the blog** (separate from the
marketing site's leads project).

- The marketing site reads blog content with the blog project's **anon
  key** through `lib/supabase-blog.ts`.
- The portal must use that same project's **service role key** for
  writes (never expose the service role key to the browser; keep it in
  server-only env on the portal app).
- The marketing site has a separate Supabase client
  (`lib/supabase.ts`, env: `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) used only for the `leads` table — it
  is unrelated to the blog and the portal does not need access to it.

Required Supabase env on the marketing site (this repo):

```
# Leads project (existing)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Blog project (new – same project as the portal)
NEXT_PUBLIC_SUPABASE_BLOG_URL=
NEXT_PUBLIC_SUPABASE_BLOG_ANON_KEY=

# Webhook secret (must match the portal)
BLOG_REVALIDATE_SECRET=
```

`BLOG_REVALIDATE_SECRET` must be the same value on both sides. Generate
with `openssl rand -hex 32`.

---

## 2. Database schema (run in Supabase SQL editor)

```sql
create extension if not exists "uuid-ossp";

-- Authors -------------------------------------------------------------
create table if not exists public.authors (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique,
  name        text not null,
  role        text,
  bio         text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Categories ----------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Posts ---------------------------------------------------------------
create table if not exists public.posts (
  id                    uuid primary key default uuid_generate_v4(),
  slug                  text unique not null,
  title                 text not null,
  excerpt               text,
  body                  text not null,                -- markdown
  hero_image            text,                         -- public storage URL
  hero_image_alt        text,
  author_id             uuid references public.authors(id) on delete set null,
  category_id           uuid references public.categories(id) on delete set null,
  reading_time_minutes  integer,
  seo_title             text,
  seo_description       text,
  og_image              text,
  published             boolean not null default false,
  published_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists posts_published_at_idx
  on public.posts (published, published_at desc);

create index if not exists posts_category_idx
  on public.posts (category_id, published, published_at desc);

-- Auto-update updated_at ---------------------------------------------
create or replace function public.tg_set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_authors_updated_at on public.authors;
create trigger set_authors_updated_at
  before update on public.authors
  for each row execute function public.tg_set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
  before update on public.categories
  for each row execute function public.tg_set_updated_at();

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
  before update on public.posts
  for each row execute function public.tg_set_updated_at();
```

---

## 3. Row-Level Security

The marketing site uses the anon key. RLS must allow anonymous reads of
**published** content only.

```sql
alter table public.posts      enable row level security;
alter table public.authors    enable row level security;
alter table public.categories enable row level security;

-- Posts: anon can read only published
drop policy if exists "anon read published posts" on public.posts;
create policy "anon read published posts"
  on public.posts for select
  to anon
  using (published = true);

-- Authors: anon can read all (referenced from posts)
drop policy if exists "anon read authors" on public.authors;
create policy "anon read authors"
  on public.authors for select
  to anon
  using (true);

-- Categories: anon can read all
drop policy if exists "anon read categories" on public.categories;
create policy "anon read categories"
  on public.categories for select
  to anon
  using (true);

-- Service role (portal) bypasses RLS automatically via the service key.
```

If you only want to expose authors that have published a post, swap the
authors policy with:

```sql
create policy "anon read authors of published posts"
  on public.authors for select
  to anon
  using (
    exists (
      select 1 from public.posts p
      where p.author_id = public.authors.id
        and p.published = true
    )
  );
```

---

## 4. Storage

Create a **public** bucket called `blog-media` for hero images, body
images and author avatars. Recommended layout:

```
blog-media/
  posts/<post-id>/hero.jpg
  posts/<post-id>/<slug>-figure-1.jpg
  authors/<author-id>/avatar.jpg
```

The public URL pattern is:

```
https://<project-ref>.supabase.co/storage/v1/object/public/blog-media/<path>
```

`next.config.ts` already whitelists `**.supabase.co/storage/v1/object/public/**`
so `next/image` can optimise these URLs.

---

## 5. Required fields the portal must set

Per post, **before publishing**:

| Field                  | Required | Notes                                                                  |
|------------------------|----------|------------------------------------------------------------------------|
| `slug`                 | yes      | URL-safe, kebab-case, unique. Becomes `/blog/<slug>`.                  |
| `title`                | yes      | Plain text, ≤ 70 chars ideal.                                          |
| `body`                 | yes      | Markdown (GFM). HTML allowed inside (sanitized server-side).           |
| `excerpt`              | strong   | 140–160 chars; used as fallback meta description and card subtitle.    |
| `hero_image`           | strong   | 1600×900+, JPG/AVIF/WebP. Used as OG fallback and hero on detail page. |
| `hero_image_alt`       | strong   | Accessibility + image SEO.                                             |
| `author_id`            | strong   | Powers Person schema and author byline.                                |
| `category_id`          | optional | Drives `/blog/category/<slug>` and breadcrumb.                         |
| `reading_time_minutes` | optional | Compute on save: `Math.ceil(words / 220)`.                             |
| `seo_title`            | optional | If empty, falls back to `${title} \| SilberArrows Blog`.               |
| `seo_description`      | optional | If empty, falls back to `excerpt`.                                     |
| `og_image`             | optional | If empty, falls back to `hero_image`, then default OG image.           |
| `published`            | yes      | Toggle to flip live/offline.                                           |
| `published_at`         | yes once published | Set on publish (or backdated). Drives ordering.              |

---

## 6. Webhook to revalidate the live site

After **any insert/update/delete** of a post (including `published`
toggle), the portal must POST to:

```
POST https://mercedes-benz.silberarrows.com/api/revalidate
Headers:
  content-type: application/json
  x-revalidate-secret: <BLOG_REVALIDATE_SECRET>
Body (all fields optional):
  {
    "type": "post",        // "post" or "blog"
    "slug": "my-post-slug",// flushes /blog/<slug>
    "tags": [],            // any extra Next cache tags to flush
    "paths": []            // any extra paths to revalidate
  }
```

The endpoint always flushes:

- `tag: blog`
- `path: /blog`
- `path: /sitemap.xml`

For `type: "post"` it additionally flushes `tag: blog:post`,
`tag: blog:list`, `tag: blog:slugs`, and `path: /blog/<slug>`.

For `type: "blog"` (e.g. category or author updates) it flushes
`tag: blog:list`, `tag: blog:slugs`, `tag: blog:categories`.

Response on success:

```json
{
  "ok": true,
  "flushedTags": ["blog", "blog:post", "blog:list", "blog:slugs"],
  "flushedPaths": ["/blog", "/blog/my-post-slug", "/sitemap.xml"],
  "revalidatedAt": "2026-05-14T12:00:00.000Z"
}
```

Failure modes:

- `401` if `x-revalidate-secret` is missing/wrong.
- `503` if `BLOG_REVALIDATE_SECRET` is not configured on this site.

### Easiest implementation on the portal

In your portal Next.js API route or Supabase Edge Function:

```ts
await fetch("https://mercedes-benz.silberarrows.com/api/revalidate", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-revalidate-secret": process.env.BLOG_REVALIDATE_SECRET!,
  },
  body: JSON.stringify({ type: "post", slug }),
});
```

You can also wire this directly off a Supabase **Database Webhook** on
the `posts` table → "Send to webhook" → URL above, with the secret as a
header.

---

## 7. SEO contract (already enforced on this site)

For each post, the marketing site emits:

- `<title>` and meta description (uses `seo_title`/`seo_description`
  with fallbacks).
- Canonical URL.
- OpenGraph + Twitter card with `og_image` → `hero_image` → site default.
- `BlogPosting` JSON-LD with author (Person), publisher (Organization),
  publishedTime, modifiedTime, image.
- `BreadcrumbList` JSON-LD: Home → Blog → Category? → Post.
- The post is added to `sitemap.xml` automatically (via
  `getAllPublishedSlugs`), with `lastmod` = `posts.updated_at`.

The portal does **not** need to render any of these — they are produced
on the marketing side from the database fields. The portal just needs to
fill those fields correctly.

---

## 8. Caching summary

| Surface                  | Behaviour                                                              |
|--------------------------|------------------------------------------------------------------------|
| `/blog`, `/blog/[slug]`  | ISR 5 min + on-demand `revalidateTag("blog")` via webhook.             |
| `/blog/category/[slug]`  | ISR 5 min + revalidate via webhook.                                    |
| `/sitemap.xml`           | ISR 10 min + on-demand revalidate via webhook.                         |
| Image CDN                | `next/image` with AVIF/WebP. Source images served from Supabase Storage.|

---

## 9. Open items for the portal app

- WYSIWYG / Markdown editor (recommend Tiptap with markdown export, or
  a simple Monaco editor).
- Preview link: optional unauthenticated draft viewer using a signed
  token (out of scope here; can be added later).
- Image upload UI to `blog-media` bucket with auto-WebP conversion.
- Reading-time auto-calc on save.
- Validation: ensure slug is unique, lowercased, kebab-cased.
- After every successful upsert/delete, fire the webhook above.
