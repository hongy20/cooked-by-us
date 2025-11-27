import { z } from "zod";
import { nullableObjectIdSchema, stringArraySchemaFactory } from "./utils";

export const RecipeInputSchema = z.object({
  name: z.string().min(2).max(30).trim(),
  description: z.string().max(200).trim(),
  image: z.url(),
  category: nullableObjectIdSchema("Invalid category id"),
  cuisine: nullableObjectIdSchema("Invalid cuisine id"),
  ingredients: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Ingredients cannot be empty — add at least one",
  }),
  instructions: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Instructions cannot be empty — add at least one",
  }),
  cookTime: z
    .string()
    .regex(
      /^PT(?=\d)((\d+)H)?((\d+)M)?((\d+)S)?$/,
      "Cook time must be in ISO 8601 duration format (e.g., PT1H30M).",
    ),
  keywords: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Keywords cannot be empty — add at least one",
  }),
});

export type RecipeInput = z.infer<typeof RecipeInputSchema>;
