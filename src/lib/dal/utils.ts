import type { PopulatedRecipeDoc } from "../model";
import type { PersistedRecipe } from "./types";

// TODO: merge toClient and recipeToClient into one function?
export function toClient<
  T extends { _id: unknown; createdAt: Date; updatedAt: Date },
>(doc: T) {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: `${_id}`,
    createdAt,
    updatedAt,
  };
}

export function recipeToClient(recipe: PopulatedRecipeDoc): PersistedRecipe {
  const category = recipe.category ? toClient(recipe.category) : null;
  const cuisine = recipe.cuisine ? toClient(recipe.cuisine) : null;

  return {
    ...toClient(recipe),
    category,
    cuisine,
  };
}
