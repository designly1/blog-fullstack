import React from "react";
import { Link } from "nextjs13-progress";
import CoverImage from "./CoverImage";

import { formatDate } from "@/lib/format";

import { PhotoCover, BlogPost } from "@/lib/blogs";

interface Props {
  title: BlogPost["title"];
  excerpt: BlogPost["excerpt"];
  slug: BlogPost["slug"];
  date: BlogPost["createdAt"];
  coverImage: PhotoCover;
}

export default function BlogPostItem(props: Props) {
  const { title, slug, date, coverImage } = props;

  const formattedDate = formatDate(date);

  return (
    <Link className="flex flex-col gap-4 w-full max-w-md" href={`/${slug}`}>
      <CoverImage className="h-64" coverImage={coverImage} />
      <h2 className="text-2xl font-bold">{title}</h2>
      <p>{formattedDate}</p>
      <p>{props.excerpt}</p>
    </Link>
  );
}
