"use server";

import { z } from "zod";
import { upload } from "@/lib/cloudinary";
import { createRecipe, deleteRecipe, updateRecipe } from "@/lib/dal/recipe";
import { type RecipeInput, RecipeInputSchema } from "@/lib/validator/recipe";
import type { FormState } from "./type";
import { authenticate } from "./utils";

export type CreateRecipeFields = RecipeInput;
export type CreateRecipeFormState = FormState<CreateRecipeFields>;

export const createRecipeAction = async (
  prevState: CreateRecipeFormState,
  formData: FormData,
): Promise<CreateRecipeFormState> => {
  await authenticate();

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

export type UpdateRecipeFields = RecipeInput & {
  recipeId: string;
};
export type UpdateRecipeFormState = FormState<UpdateRecipeFields>;

export const updateRecipeAction = async (
  prevState: UpdateRecipeFormState,
  formData: FormData,
): Promise<UpdateRecipeFormState> => {
  await authenticate();

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
  const recipeId = formData.get("recipeId") as string;
  const patchedFields = { ...fields, recipeId };

  const validatedFields = RecipeInputSchema.safeParse(fields);
  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields: patchedFields,
      errors,
    };
  }

  try {
    const updated = await updateRecipe(recipeId, validatedFields.data);
    if (!updated) {
      throw new Error("Recipe not found");
    }
    return { status: "success", fields: patchedFields };
  } catch {
    throw new Error("Recipe updation failed");
  }
};

export const deleteRecipeAction = async (
  recipeId: string,
): Promise<boolean> => {
  await authenticate();

  return await deleteRecipe(recipeId);
};
