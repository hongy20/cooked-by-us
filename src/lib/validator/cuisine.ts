import { z } from "zod";

export const CuisineInputSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(100)
    .trim(),
});

export type CuisineInput = z.infer<typeof CuisineInputSchema>;
