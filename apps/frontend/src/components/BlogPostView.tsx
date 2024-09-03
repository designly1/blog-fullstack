import React from "react";
import { Link } from "nextjs13-progress";
import CoverImage from "./CoverImage";
import BlogContent from "./BlogContent";

import { formatDate } from "@/lib/format";

import { BlogPost } from "@/lib/blogs";

interface Props {
  post: BlogPost;
}

export default function BlogPostView(props: Props) {
  const {
    post: { title, content, coverPhoto, slug, createdAt },
  } = props;

  const formattedDate = formatDate(createdAt);

  return (
    <div className="w-full max-w-5xl mx-auto py-20">
      <div className="flex items-center gap-3">
        <Link href="/" className="link-primary">
          The Blog
        </Link>
        <span>&gt;</span>
        <span>{title}</span>
      </div>
      <h1 className="text-4xl font-bold mt-6">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
      <CoverImage className="h-[600px] mt-6" coverImage={coverPhoto} />
      <BlogContent className="mt-6" content={content} />
    </div>
  );
}
