import { CollectionConfig } from "payload/types";

import { slug } from "../fields/slug";
import { access } from "../lib/access";

const Blogs: CollectionConfig = {
  slug: "blogs",
  admin: {
    useAsTitle: "title",
    description: "A collection of blog posts",
  },
  access: {
    read: () => true,
    create: access,
    update: access,
    delete: access,
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "coverPhoto",
      label: "Cover Photo",
      type: "upload",
      relationTo: "photos",
      required: true,
      admin: {
        disableListColumn: true,
      },
    },
    slug(
      { trackingField: "title" },
      {
        required: true,
        admin: {
          readOnly: true,
          disableListColumn: true,
        },
      }
    ),
    {
      name: "excerpt",
      label: "Excerpt",
      type: "textarea",
      required: true,
      admin: {
        disableListColumn: true,
      },
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
      admin: {
        disableListColumn: true,
      },
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
