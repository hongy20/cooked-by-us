"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { type RecipeInput, RecipeValidator } from "@/lib/validator/recipe";
import { upload } from "../cloudinary";
import { createRecipe, getAllRecipes } from "../dal/recipe";
import type { IRecipe } from "../model/recipe";
import type { FormState } from "./type";

export type CreateRecipeFormState = FormState<Omit<RecipeInput, "author">>;

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
    author: session.user.id,
    category: formData.get("category") as string,
    cuisine: formData.get("cuisine") as string,
    ingredients: JSON.parse(formData.get("ingredients") as string),
    instructions: JSON.parse(formData.get("instructions") as string),
    cookTime: formData.get("cookTime") as string,
    keywords: JSON.parse(formData.get("keywords") as string),
  };
  const validatedFields = RecipeValidator.safeParse(fields);

  if (!validatedFields.success) {
    const { author: _author, ...errors } = z.flattenError(
      validatedFields.error,
    ).fieldErrors;
    return {
      status: "error",
      fields,
      errors,
    };
  }

  let recipe: IRecipe | undefined;
  try {
    recipe = await createRecipe(validatedFields.data);
  } catch (e) {
    console.error("Recipe creation failed", e);
    // TODO: show error in client
    return {
      status: "error",
      fields,
    };
  }

  redirect(`/recipe/${recipe.id}`);
};

export const getAllRecipesAction = async () => {
  const recipes = await getAllRecipes();
  return recipes;
};
