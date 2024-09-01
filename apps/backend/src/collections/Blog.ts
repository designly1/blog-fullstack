import { CollectionConfig } from "payload/types";

import { slug } from "../fields/slug";

const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    slug({ trackingField: "title" }),
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    },
  ],
};

export default Blogs;
