import React from "react";
import BlogPostItem from "@/components/BlogPostItem";

import { getBlogs } from "@/lib/blogs";

export const revalidate = process.env.NODE_ENV === "development" ? 1 : 60;

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-10 py-20">
      {blogs.map((blog) => (
        <BlogPostItem
          key={blog.id}
          title={blog.title}
          excerpt={blog.excerpt}
          slug={blog.slug}
          date={blog.createdAt}
          coverImage={blog.coverPhoto}
        />
      ))}
    </div>
  );
}
