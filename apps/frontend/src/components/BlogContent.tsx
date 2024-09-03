import React from "react";

import { serialize } from "@/lib/renderer";

import { Blog } from "$/payload-types";

export type BlogContentProps = Pick<Blog, "content"> & { className?: string };

export default function BlogContent(props: BlogContentProps) {
  const { content, className = "" } = props;

  const jsx = serialize(content);

  return (
    <div className={`post-body flex flex-col gap-6 ${className}`}>{jsx}</div>
  );
}
