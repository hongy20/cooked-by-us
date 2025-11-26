import { z } from "zod";

export const CategoryInputSchema = z.object({
  name: z.string().min(1).max(100).trim(),
});

export type CategoryInput = z.infer<typeof CategoryInputSchema>;
