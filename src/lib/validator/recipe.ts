import { z } from "zod";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "../constant";
import { stringArraySchemaFactory } from "./util";

// Zod schema for an individual instruction step
const InstructionStep = z.object({
  text: z.string().min(1, "Instruction text cannot be empty."),
  image: z.url("Instruction image must be a valid URL.").optional(),
});

// Zod schema for the Recipe model
export const RecipeValidator = z.object({
  name: z.string().min(3).trim(),
  description: z.string().min(10),
  image: z.url(),
  author: z
    .string()
    .length(24, "Invalid Event ID")
    .regex(/^[0-9a-fA-F]{24}$/, "Author ID must be a valid MongoDB ObjectId"),
  recipeCategory: z.enum(RECIPE_CATEGORY),
  recipeCuisine: z.enum(RECIPE_CUISINE),
  recipeIngredient: stringArraySchemaFactory(1),
  recipeInstructions: z
    .array(InstructionStep)
    .min(1, "At least one instruction step is required."),
  cookTime: z
    .string()
    .regex(
      /^PT(\dH)?(\dM)?(\dS)?$/,
      "Cook time must be in ISO 8601 duration format (e.g., PT1H30M).",
    ),
  keywords: stringArraySchemaFactory(1),
});

export type RecipeInput = z.infer<typeof RecipeValidator>;
