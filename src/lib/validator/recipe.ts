import { z } from "zod";
import { objectIdSchema, stringArraySchemaFactory } from "./util";

// Zod schema for the Recipe model
export const RecipeValidator = z.object({
  name: z.string().min(3).trim(),
  description: z.string().trim(),
  image: z.url(),
  author: objectIdSchema("Author ID must be valid"),
  category: objectIdSchema("A recipe category is required"),
  cuisine: objectIdSchema("A recipe cuisine is required"),
  ingredients: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Ingredients cannot be empty — add at least one",
  }),
  instructions: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "At least one instruction step is required.",
  }),
  cookTime: z
    .string()
    .regex(
      /^PT(\d+H)?(\d+M)?(\d+S)?$/,
      "Cook time must be in ISO 8601 duration format (e.g., PT1H30M).",
    ),
  keywords: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Keywords cannot be empty — add at least one",
  }),
});

export type RecipeInput = z.infer<typeof RecipeValidator>;
