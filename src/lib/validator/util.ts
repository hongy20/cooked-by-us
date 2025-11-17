import { z } from "zod";

export const stringArraySchemaFactory = ({
  minLength,
  errorMessage,
}: {
  minLength: number;
  errorMessage: string;
}) => {
  return z.preprocess(
    (val) => {
      if (typeof val !== "string") return val;

      let arr: string[] = [];

      // Try JSON.parse first
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {}

      // Fallback: split by comma, remove quotes, trim
      arr = val
        .split(",")
        .map((s) =>
          s
            .trim()
            .replace(/^"(.+)"$/, "$1")
            .replace(/^'(.+)'$/, "$1"),
        )
        .filter(Boolean);

      return arr;
    },
    z.array(z.string()).min(minLength, errorMessage),
  );
};
