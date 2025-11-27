import "server-only";
import { cache } from "react";
import { type PopulatedRecipeDoc, RecipeModel } from "@/lib/model";
import connectDB from "@/lib/mongodb";
import type { RecipeInput } from "@/lib/validator/recipe";
import type { PersistedRecipe } from "./types";
import { toClient } from "./utils";

// Write
export const createRecipe = async (data: RecipeInput): Promise<string> => {
  await connectDB();
  const doc = await RecipeModel.create(data);
  return `${doc._id}`;
};

export const updateRecipe = async (
  recipeId: string,
  data: RecipeInput,
): Promise<PersistedRecipe | undefined> => {
  await connectDB();
  const doc = await RecipeModel.findByIdAndUpdate(
    recipeId,
    {
      $set: data,
    },
    { new: true },
  )
    .populate(["category", "cuisine"])
    .lean<PopulatedRecipeDoc>();
  return doc ? toClient(doc) : undefined;
};

export const updateRecipesAfterCategoryDeletion = async (
  categoryId: string,
): Promise<boolean> => {
  await connectDB();
  const { acknowledged } = await RecipeModel.updateMany(
    { category: categoryId },
    { $set: { category: null } },
  );
  return acknowledged;
};

export const updateRecipesAfterCuisineDeletion = async (
  cuisineId: string,
): Promise<boolean> => {
  await connectDB();
  const { acknowledged } = await RecipeModel.updateMany(
    { cuisine: cuisineId },
    { $set: { cuisine: null } },
  );
  return acknowledged;
};

export const deleteRecipe = async (recipeId: string): Promise<boolean> => {
  await connectDB();
  const doc = await RecipeModel.findByIdAndDelete(recipeId);
  return !!doc;
};

// Read
export const getRecipe = cache(
  async (recipeId: string): Promise<PersistedRecipe | undefined> => {
    await connectDB();
    const doc = await RecipeModel.findById(recipeId)
      .populate(["category", "cuisine"])
      .lean<PopulatedRecipeDoc>();
    return doc ? toClient(doc) : undefined;
  },
);

export const getAllRecipes = cache(async (): Promise<PersistedRecipe[]> => {
  await connectDB();
  const docs = await RecipeModel.find()
    .sort({ createdAt: -1 })
    .populate(["category", "cuisine"])
    .lean<PopulatedRecipeDoc[]>();
  return docs.map((doc) => toClient(doc));
});

export const getSimilarRecipes = cache(
  async (recipeId: string): Promise<PersistedRecipe[]> => {
    await connectDB();
    const recipe = await getRecipe(recipeId);

    const docs = recipe
      ? await RecipeModel.find({
          keywords: { $in: recipe.keywords },
          _id: { $ne: recipe.id },
        })
          .populate(["category", "cuisine"])
          .lean<PopulatedRecipeDoc[]>()
      : [];

    return docs.map((doc) => toClient(doc));
  },
);
