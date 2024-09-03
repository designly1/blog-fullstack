import { CollectionConfig } from "payload/types";

import { access } from "../lib/access";

const Photos: CollectionConfig = {
  slug: "photos",
  admin: {
    useAsTitle: "title",
    description: "A collection of photos",
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
  ],
  upload: {
    staticURL: "https://cdn.designly.biz/blogtest/photos",
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/jpeg", "image/png"],
  },
};

export default Photos;
