import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getClient } from "./db/mongodb";

const client = await getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client),
});
