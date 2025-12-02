"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { upload } from "@/lib/cloudinary";
import { CACHE_TAG_RECIPES } from "@/lib/constant";
import { createRecipe, deleteRecipe, updateRecipe } from "@/lib/dal/recipe";
import { type RecipeInput, RecipeInputSchema } from "@/lib/validator/recipe";
import type { FormState } from "./type";
import { authenticate, parseJSON } from "./utils";

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
    ingredients: parseJSON(formData.get("ingredients")),
    instructions: parseJSON(formData.get("instructions")),
    cookTime: formData.get("cookTime") as string,
    keywords: parseJSON(formData.get("keywords")),
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

    updateTag(CACHE_TAG_RECIPES);

    return { status: "success", fields };
  } catch (error) {
    throw new Error(
      `Recipe creation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
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
    ingredients: parseJSON(formData.get("ingredients")),
    instructions: parseJSON(formData.get("instructions")),
    cookTime: formData.get("cookTime") as string,
    keywords: parseJSON(formData.get("keywords")),
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

    if (updated) {
      updateTag(CACHE_TAG_RECIPES);
    } else {
      throw new Error("Recipe not found");
    }

    return { status: "success", fields: patchedFields };
  } catch (error) {
    throw new Error(
      `Recipe update failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const deleteRecipeAction = async (
  recipeId: string,
): Promise<boolean> => {
  await authenticate();

  const deleted = await deleteRecipe(recipeId);

  if (deleted) {
    updateTag(CACHE_TAG_RECIPES);
  }

  return deleted;
};
