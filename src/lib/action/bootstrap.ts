"use server";

import {
  bootstrapCategories,
  bootstrapCuisines,
  bootstrapRecipes,
} from "@/lib/dal/bootstrap";
import { authenticate } from "./utils";

export const bootstrapCategoriesAction = async () => {
  await authenticate();
  await bootstrapCategories();
};

export const bootstrapCuisinesAction = async () => {
  await authenticate();
  await bootstrapCuisines();
};

export const bootstrapRecipesAction = async () => {
  await authenticate();
  await bootstrapRecipes();
};
