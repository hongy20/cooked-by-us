import { getSession } from "@/lib/auth";

export const authenticate = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("You have to login first");
  }
};

export const isDuplicatedKeyError = (error: unknown) =>
  error instanceof Object && "code" in error && error.code === 11000;

export const parseJSON = (value: unknown): string[] => {
  try {
    const parsed = JSON.parse(value as string);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
