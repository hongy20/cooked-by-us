"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { type RecipeInput, RecipeValidator } from "@/lib/validator/recipe";
import { upload } from "../cloudinary";
import type { FormState } from "./type";

export type CreateRecipeFormState = FormState<
  Omit<RecipeInput, "author" | "recipeInstructions">
>;

export const createRecipeAction = async (
  prevState: CreateRecipeFormState,
  formData: FormData,
): Promise<CreateRecipeFormState> => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // 1. Validate form data
  const file = formData.get("image") as File;
  const image = file.size > 0 ? await upload(file) : prevState.fields.image;

  const fields = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    image,
    // author: formData.get("author") as string,
    recipeCategory: formData.get("recipeCategory") as string,
    recipeCuisine: formData.get("recipeCuisine") as string,
    recipeIngredients: JSON.parse(formData.get("recipeIngredients") as string),
    // recipeInstructions: formData.get("recipeInstructions") as string,
    cookTime: formData.get("cookTime") as string,
    keywords: JSON.parse(formData.get("keywords") as string),
  };
  const validatedFields = RecipeValidator.safeParse(fields);

  if (!validatedFields.success) {
    const {
      author: _author,
      recipeInstructions: _recipeInstructions,
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
