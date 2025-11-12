import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { getClient } from "./db/mongodb";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Environment variables GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set.",
  );
}

const client = await getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
});

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });
