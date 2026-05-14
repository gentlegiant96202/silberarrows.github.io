import { unstable_cache } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import type {
  BlogCategory,
  BlogListResult,
  BlogPost,
  BlogPostListItem,
} from "@/lib/blog/types";

const POST_LIST_FIELDS = `
  id, slug, title, excerpt, hero_image, hero_image_alt,
  reading_time_minutes, seo_title, seo_description, og_image,
  published, published_at, created_at, updated_at,
  author:authors ( id, slug, name, role, bio, avatar_url ),
  category:categories ( id, slug, name, description )
`;

const POST_FULL_FIELDS = `${POST_LIST_FIELDS}, body`;

export const POSTS_PER_PAGE = 9;

type RawPost = Omit<BlogPost, "author" | "category"> & {
  author: BlogPost["author"] | BlogPost["author"][] | null;
  category: BlogPost["category"] | BlogPost["category"][] | null;
};

function normalizePost<T extends Partial<RawPost>>(row: T): T & {
  author: BlogPost["author"];
  category: BlogPost["category"];
} {
  const author = Array.isArray(row.author) ? (row.author[0] ?? null) : row.author ?? null;
  const category = Array.isArray(row.category)
    ? (row.category[0] ?? null)
    : row.category ?? null;
  return { ...row, author, category } as T & {
    author: BlogPost["author"];
    category: BlogPost["category"];
  };
}

async function loadPosts(options: {
  page: number;
  perPage: number;
  categorySlug?: string;
}): Promise<BlogListResult> {
  const supabase = getSupabase();
  const { page, perPage, categorySlug } = options;

  if (!supabase) {
    return {
      posts: [],
      pagination: { page, perPage, total: 0, totalPages: 0 },
    };
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("posts")
    .select(POST_LIST_FIELDS, { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (categorySlug) {
    query = query.eq("category.slug", categorySlug);
  }

  const { data, count, error } = await query;
  if (error) {
    console.error("[blog] loadPosts error:", error.message);
    return {
      posts: [],
      pagination: { page, perPage, total: 0, totalPages: 0 },
    };
  }

  const posts: BlogPostListItem[] = (data ?? []).map((row) =>
    normalizePost(row as RawPost) as unknown as BlogPostListItem
  );
  const total = count ?? posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return { posts, pagination: { page, perPage, total, totalPages } };
}

async function loadPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select(POST_FULL_FIELDS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[blog] loadPostBySlug error:", error.message);
    return null;
  }
  if (!data) return null;
  return normalizePost(data as RawPost) as unknown as BlogPost;
}

async function loadAllPublishedSlugs(): Promise<
  Array<{ slug: string; updated_at: string }>
> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);
  if (error) {
    console.error("[blog] loadAllPublishedSlugs error:", error.message);
    return [];
  }
  return data ?? [];
}

async function loadCategories(): Promise<BlogCategory[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description")
    .order("name", { ascending: true });
  if (error) {
    console.error("[blog] loadCategories error:", error.message);
    return [];
  }
  return data ?? [];
}

async function loadCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name, description")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("[blog] loadCategoryBySlug error:", error.message);
    return null;
  }
  return data;
}

async function loadRelatedPosts(
  postId: string,
  categoryId: string | null,
  limit: number
): Promise<BlogPostListItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("posts")
    .select(POST_LIST_FIELDS)
    .eq("published", true)
    .neq("id", postId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (categoryId) query = query.eq("category_id", categoryId);

  const { data, error } = await query;
  if (error) {
    console.error("[blog] loadRelatedPosts error:", error.message);
    return [];
  }
  return ((data ?? []).map((row) =>
    normalizePost(row as RawPost) as unknown as BlogPostListItem
  ));
}

export const getPosts = unstable_cache(
  (page: number, perPage: number, categorySlug?: string) =>
    loadPosts({ page, perPage, categorySlug }),
  ["blog:list:v1"],
  { tags: ["blog", "blog:list"], revalidate: 300 }
);

export const getPostBySlug = unstable_cache(
  (slug: string) => loadPostBySlug(slug),
  ["blog:post:v1"],
  { tags: ["blog", "blog:post"], revalidate: 300 }
);

export const getAllPublishedSlugs = unstable_cache(
  () => loadAllPublishedSlugs(),
  ["blog:slugs:v1"],
  { tags: ["blog", "blog:slugs"], revalidate: 300 }
);

export const getCategories = unstable_cache(
  () => loadCategories(),
  ["blog:categories:v1"],
  { tags: ["blog", "blog:categories"], revalidate: 600 }
);

export const getCategoryBySlug = unstable_cache(
  (slug: string) => loadCategoryBySlug(slug),
  ["blog:category:v1"],
  { tags: ["blog", "blog:categories"], revalidate: 600 }
);

export const getRelatedPosts = unstable_cache(
  (postId: string, categoryId: string | null, limit: number) =>
    loadRelatedPosts(postId, categoryId, limit),
  ["blog:related:v1"],
  { tags: ["blog", "blog:list"], revalidate: 300 }
);

export function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
