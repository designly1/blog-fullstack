import React from "react";
import BlogPostView from "@/components/BlogPostView";

import { getBlog, getAllSlugs } from "@/lib/blogs";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = process.env.NODE_ENV === "development" ? 1 : 60;

export async function generateMetadata({ params: { slug } }: Props) {
  const post = await getBlog(slug);

  if (!post) {
    return {
      title: "Error 404 - Post not found",
      description: "Error 404 - Post not found",
    };
  }

  const title = `${post.title} | The Blog`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.coverPhoto.url,
          width: 1920,
          height: 1080,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();

  if (!slugs) {
    return [];
  }

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage(props: Props) {
  const { slug } = props.params;

  const blog = await getBlog(slug);

  if (!blog) {
    throw new Error(`Post not found: ${slug}`);
  }

  return <BlogPostView post={blog} />;
}
