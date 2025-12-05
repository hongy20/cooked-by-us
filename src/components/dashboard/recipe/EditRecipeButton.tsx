"use client";

import { Edit } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type UpdateRecipeFormState,
  updateRecipeAction,
} from "@/lib/action/recipe";
import type { PersistedRecipe } from "@/lib/dal/types";
import { RecipeEditForm } from "./RecipeEditForm/RecipeEditForm";

const getInitialState = (recipe: PersistedRecipe): UpdateRecipeFormState => ({
  status: "idle",
  fields: {
    recipeId: recipe.id,
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    category: recipe.category?.id ?? null,
    cuisine: recipe.cuisine?.id ?? null,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cookTime: recipe.cookTime,
    keywords: recipe.keywords,
  },
});

type Props = { recipe: PersistedRecipe };

export const EditRecipeButton = ({ recipe }: Props) => (
  <EntitySheet
    getInitialState={() => getInitialState(recipe)}
    action={updateRecipeAction}
    editForm={RecipeEditForm}
    successMessage="Recipe updated!"
    failureMessage="Recipe update failed"
    sheetTitle="Edit Recipe"
    sheetTriggerIcon={Edit}
    sheetSubmitText="Save"
    sheetSubmittingText="Saving..."
  />
);
