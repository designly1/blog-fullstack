import { Field } from "payload/types";
import { merge } from "lodash";
import SlugInput from "../ui/SlugInput";

type Slug = (
  options?: { trackingField?: string },
  overrides?: Partial<Field>
) => Field;

export const slug: Slug = ({ trackingField = "title" } = {}, overrides) =>
  merge<Field, Partial<Field> | undefined>(
    {
      name: "slug",
      unique: true,
      type: "text",
      admin: {
        position: "sidebar",
        components: {
          Field: SlugInput,
        },
      },
    },
    overrides
  );
