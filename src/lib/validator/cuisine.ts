import { z } from "zod";
import { objectIdSchema } from "./util";

export const CuisineValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .trim(),
  author: objectIdSchema,
});

export type CuisineInput = z.infer<typeof CuisineValidator>;
