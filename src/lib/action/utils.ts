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
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((item) => item);
  } catch {
    return [];
  }
};
