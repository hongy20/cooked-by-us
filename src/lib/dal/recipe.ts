import "server-only";
import { cache } from "react";
import { type IPopulatedRecipe, RecipeModel } from "@/lib/model";
import connectDB from "@/lib/mongodb";
import type { RecipeInput } from "@/lib/validator/recipe";

// Write
export const createRecipe = async (data: RecipeInput) => {
  await connectDB();
  return await RecipeModel.create(data);
};

export const updateRecipesAfterCategoryDeletion = async (
  categoryId: string,
) => {
  await connectDB();
  return await RecipeModel.updateMany(
    { category: categoryId },
    { $set: { category: null } },
  );
};

export const updateRecipesAfterCuisineDeletion = async (cuisineId: string) => {
  await connectDB();
  return await RecipeModel.updateMany(
    { cuisine: cuisineId },
    { $set: { cuisine: null } },
  );
};

export const deleteRecipe = async (recipeId: string) => {
  await connectDB();
  return await RecipeModel.findByIdAndDelete(recipeId);
};

// Read
export const getRecipe = cache(async (recipeId: string) => {
  await connectDB();
  return await RecipeModel.findById(recipeId)
    .populate("category")
    .populate("cuisine")
    .lean<IPopulatedRecipe>();
});

export const getAllRecipes = async () => {
  await connectDB();
  return await RecipeModel.find()
    .sort({ createdAt: -1 })
    .populate("category")
    .populate("cuisine")
    .lean<IPopulatedRecipe[]>();
};

export const getSimilarRecipes = async (recipeId: string) => {
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    return [];
  }

  return await RecipeModel.find({
    keywords: { $in: recipe.keywords },
    _id: { $ne: recipe._id },
  }).lean<IPopulatedRecipe[]>();
};
