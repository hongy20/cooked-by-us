import { z } from "zod";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "@/lib/constant";
import { objectIdSchema, stringArraySchemaFactory } from "./util";

// Zod schema for an individual instruction step
const InstructionValidator = z.object({
  text: z.string().min(1, "Instruction text cannot be empty."),
  image: z.url("Instruction image must be a valid URL.").optional(),
});

// Zod schema for the Recipe model
export const RecipeValidator = z.object({
  name: z.string().min(3).trim(),
  description: z.string().trim(),
  image: z.url(),
  author: objectIdSchema,
  category: z.enum(RECIPE_CATEGORY, "A recipe category is required."),
  cuisine: z.enum(RECIPE_CUISINE, "A recipe cuisine is required."),
  ingredients: stringArraySchemaFactory({
    minLength: 1,
    errorMessage: "Ingredients cannot be empty — add at least one",
  }),
  instructions: z
    .array(InstructionValidator)
    .min(1, "At least one instruction step is required."),
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

export type InstructionInput = z.infer<typeof InstructionValidator>;

export type RecipeInput = z.infer<typeof RecipeValidator>;
