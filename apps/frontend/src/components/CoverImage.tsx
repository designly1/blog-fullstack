import React from "react";

import { PhotoCover } from "@/lib/blogs";

interface CoverImageProps {
  coverImage: PhotoCover;
  className?: string;
}

export default function CoverImage(props: CoverImageProps) {
  const {
    coverImage: { url, title },
    className = "",
  } = props;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url || ""} alt={title} className={`w-full object-cover ${className}`} />
    </>
  );
}
