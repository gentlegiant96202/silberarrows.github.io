import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getPosts } from "@/lib/blog/queries";

const HOME_POST_COUNT = 3;

export async function LatestPosts() {
  const { posts } = await getPosts(1, HOME_POST_COUNT);
  if (posts.length === 0) return null;

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="home-latest-posts">
      <div className="container-page">
        <SectionHeader
          eyebrow="The Journal"
          title="Latest from our Mercedes-Benz workshop"
          intro="Service guides, technical deep-dives and ownership advice from Dubai's independent Mercedes-Benz specialists."
        />

        <div
          id="home-latest-posts"
          className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full silver-chip px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-silver-shine transition hover:scale-[1.02]"
          >
            Read all articles
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
