import { BookOpen } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No posts yet",
  description = "We're working on it. Check back soon for Mercedes-Benz service guides, technical deep-dives and ownership tips from our Dubai workshop.",
}: EmptyStateProps) {
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl glass-card ring-silver p-10 text-center">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10">
        <BookOpen size={20} className="text-[color:var(--color-platinum)]" />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-silver-shine">{title}</h2>
      <p className="mt-3 text-sm text-[color:var(--color-silver-400)]">
        {description}
      </p>
    </div>
  );
}
