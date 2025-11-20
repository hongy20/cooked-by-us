import "server-only";
import { cache } from "react";
import { type IPopulatedRecipe, type IRecipe, RecipeModel } from "@/lib/model";
import connectDB from "@/lib/mongodb";
import type { RecipeInput } from "@/lib/validator/recipe";

export const createRecipe = async (data: RecipeInput) => {
  await connectDB();
  return await RecipeModel.create(data);
};

export const getRecipe = cache(async (recipeId: string) => {
  await connectDB();
  return await RecipeModel.findById(recipeId)
    .populate("category")
    .populate("cuisine")
    .lean<IPopulatedRecipe>();
});

export const getAllRecipes = async () => {
  await connectDB();
  return await RecipeModel.find().sort({ createdAt: -1 }).lean<IRecipe[]>();
};

export const getSimilarRecipes = async (recipeId: string) => {
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    return [];
  }

  return await RecipeModel.find({
    keywords: { $in: recipe.keywords },
    _id: { $ne: recipe._id },
  }).lean<IRecipe[]>();
};
