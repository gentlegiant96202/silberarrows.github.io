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
    <section
      className="relative border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="home-latest-posts"
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="The Journal"
            title="Latest from our Mercedes-Benz workshop"
            intro="Service guides, technical deep-dives and ownership advice from Dubai's independent Mercedes-Benz specialists."
          />
        </div>

        <div
          id="home-latest-posts"
          className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post) => (
            <div key={post.id} className="reveal h-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/blog"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Read all articles
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
