import { z } from "zod";
import { objectIdSchema } from "./util";

export const CategoryValidator = z.object({
  name: z.string().min(1).trim(),
  author: objectIdSchema,
});

export type CategoryInput = z.infer<typeof CategoryValidator>;
