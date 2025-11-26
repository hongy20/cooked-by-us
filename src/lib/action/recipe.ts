"use server";

import { z } from "zod";
import { upload } from "@/lib/cloudinary";
import { createRecipe, deleteRecipe } from "@/lib/dal/recipe";
import { type RecipeInput, RecipeInputSchema } from "@/lib/validator/recipe";
import type { FormState } from "./type";
import { authenticate } from "./utils";

export type CreateRecipeFormState = FormState<Omit<RecipeInput, "author">>;

export const createRecipeAction = async (
  prevState: CreateRecipeFormState,
  formData: FormData,
): Promise<CreateRecipeFormState> => {
  authenticate();

  // 1. Validate form data
  const file = formData.get("image") as File;
  const image = file.size > 0 ? await upload(file) : prevState.fields.image;

  const fields = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image,
    category: formData.get("category") as string,
    cuisine: formData.get("cuisine") as string,
    ingredients: JSON.parse(formData.get("ingredients") as string),
    instructions: JSON.parse(formData.get("instructions") as string),
    cookTime: formData.get("cookTime") as string,
    keywords: JSON.parse(formData.get("keywords") as string),
  };
  const validatedFields = RecipeInputSchema.safeParse(fields);

  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields,
      errors,
    };
  }

  try {
    await createRecipe(validatedFields.data);
    return { status: "success", fields };
  } catch {
    throw new Error("Recipe creation failed");
  }
};

export const deleteRecipeAction = async (
  recipeId: string,
): Promise<boolean> => {
  authenticate();

  return await deleteRecipe(recipeId);
};
