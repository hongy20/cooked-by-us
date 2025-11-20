import { z } from "zod";

export const CategoryValidator = z.object({
  name: z.string().min(1).trim(),
});

export type CategoryInput = z.infer<typeof CategoryValidator>;
