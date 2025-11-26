"use server";

import {
  bootstrapCategories,
  bootstrapCuisines,
  bootstrapRecipes,
} from "../dal/bootstrap";

export const bootstrapCategoriesAction = bootstrapCategories;
export const bootstrapCuisinesAction = bootstrapCuisines;
export const bootstrapRecipesAction = bootstrapRecipes;
