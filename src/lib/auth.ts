import "server-only";
import { APIError, betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { getClient } from "./db/mongodb";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const allowedGoogleEmails = (process.env.ALLOWED_GOOGLE_EMAILS || "")
  .toLowerCase()
  .split(",");

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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isAllowedToSignUp = allowedGoogleEmails.includes(
            user.email.toLowerCase(),
          );
          if (!isAllowedToSignUp) {
            throw new APIError("BAD_REQUEST", {
              message: "Signup is disabled",
            });
          }
        },
      },
    },
  },
});

export const getSession = async () =>
  await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error) => {
      console.error("Failed to get session:", error);
      // Treat as unauthenticated on session fetch failure
      return null;
    });
