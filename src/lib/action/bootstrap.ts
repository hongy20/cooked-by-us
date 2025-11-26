"use server";

import {
  bootstrapCategories,
  bootstrapCuisines,
  bootstrapRecipes,
} from "@/lib/dal/bootstrap";

export const bootstrapCategoriesAction = bootstrapCategories;
export const bootstrapCuisinesAction = bootstrapCuisines;
export const bootstrapRecipesAction = bootstrapRecipes;
