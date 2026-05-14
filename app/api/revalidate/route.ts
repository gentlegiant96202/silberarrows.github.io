import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const SECRET_HEADER = "x-revalidate-secret";

type RevalidateBody = {
  type?: "blog" | "post";
  slug?: string;
  paths?: string[];
  tags?: string[];
};

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: NextRequest) {
  const expected = process.env.BLOG_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "BLOG_REVALIDATE_SECRET not configured" },
      { status: 503 }
    );
  }

  const provided = request.headers.get(SECRET_HEADER) ?? "";
  if (!timingSafeEqual(provided, expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const flushedTags: string[] = [];
  const flushedPaths: string[] = [];

  const tags = new Set<string>(["blog"]);
  if (body.type === "blog") {
    tags.add("blog:list");
    tags.add("blog:slugs");
    tags.add("blog:categories");
  } else if (body.type === "post") {
    tags.add("blog:post");
    tags.add("blog:list");
    tags.add("blog:slugs");
  }
  for (const tag of body.tags ?? []) tags.add(tag);

  for (const tag of tags) {
    revalidateTag(tag);
    flushedTags.push(tag);
  }

  const paths = new Set<string>(body.paths ?? []);
  paths.add("/blog");
  paths.add("/sitemap.xml");
  if (body.slug) {
    paths.add(`/blog/${body.slug}`);
  }

  for (const path of paths) {
    try {
      revalidatePath(path);
      flushedPaths.push(path);
    } catch (err) {
      console.error("[revalidate] failed for", path, err);
    }
  }

  return NextResponse.json({
    ok: true,
    flushedTags,
    flushedPaths,
    revalidatedAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST with x-revalidate-secret header." },
    { status: 405 }
  );
}
