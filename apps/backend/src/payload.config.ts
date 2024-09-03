import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

// Collections
import Users from "./collections/Users";
import Blogs from "./collections/Blog";
import Photos from "./collections/Photo";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Blogs, Photos],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
    declare: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  plugins: [
    payloadCloud(),
    cloudStorage({
      collections: {
        photos: {
          prefix: "blogtest/photos",
          disableLocalStorage: true,
          adapter: s3Adapter({
            config: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              },
              region: "us-east-1",
            },
            bucket: "designly-cdn",
          }),
        },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
