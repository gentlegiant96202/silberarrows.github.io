export type BlogAuthor = {
  id: string;
  slug: string | null;
  name: string;
  role: string | null;
  bio: string | null;
  avatar_url: string | null;
};

export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  hero_image: string | null;
  hero_image_alt: string | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: BlogAuthor | null;
  category: BlogCategory | null;
};

export type BlogPostListItem = Omit<BlogPost, "body">;

export type BlogPagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type BlogListResult = {
  posts: BlogPostListItem[];
  pagination: BlogPagination;
};
