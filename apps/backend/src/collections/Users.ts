import { CollectionConfig } from "payload/types";

import { access } from "../lib/access";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: "email",
    description: "A collection of users",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  access: {
    read: access,
    create: access,
    update: access,
    delete: access,
  },
};

export default Users;
