import { AccessArgs } from "payload/config";

export function access({ req }: AccessArgs) {
  const { user } = req;

  return !!user;
}
