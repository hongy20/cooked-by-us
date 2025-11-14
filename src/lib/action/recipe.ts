"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { type RecipeInput, RecipeValidator } from "@/lib/validator/recipe";
import type { FormState } from "./type";

export type CreateRecipeFormState = FormState<
  Omit<
    RecipeInput,
    "image" | "author" | "recipeIngredient" | "recipeInstructions" | "keywords"
  >
>;

export const createRecipeAction = async (
  _prevState: CreateRecipeFormState,
  formData: FormData,
): Promise<CreateRecipeFormState> => {
  const session = await getSession();
  if (session) {
    redirect("/login");
  }

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    // image: formData.get("image") as string,
    // author: formData.get("author") as string,
    recipeCategory: formData.get("recipeCategory") as string,
    recipeCuisine: formData.get("recipeCuisine") as string,
    // recipeIngredient: formData.get("recipeIngredient") as string,
    // recipeInstructions: formData.get("recipeInstructions") as string,
    cookTime: formData.get("cookTime") as string,
    // keywords: formData.get("keywords") as string,
  };
  const validatedFields = RecipeValidator.safeParse(fields);

  if (!validatedFields.success) {
    const {
      image: _image,
      author: _author,
      recipeIngredient: _recipeIngredient,
      recipeInstructions: _recipeInstructions,
      keywords: _keywords,
      ...errors
    } = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields,
      errors,
    };
  }

  console.log(
    "TODO: 1.",
    formData.get("image"),
    formData.get("author"),
    formData.get("recipeInstructions"),
  );

  // 2. Prepare data for insertion into database
  console.log("TODO: 2. Prepare data for insertion into database");

  // 3. Insert the data into the database
  console.log("TODO: 3. Insert the data into the database");

  // 4. Redirect to the recipe page
  console.log("TODO: 4. Redirect to the recipe page");

  return { status: "success", fields };
};
