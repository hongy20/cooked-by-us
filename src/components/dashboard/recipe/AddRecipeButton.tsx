"use client";

import { Plus } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type CreateRecipeFormState,
  createRecipeAction,
} from "@/lib/action/recipe";
import { RecipeEditForm } from "./RecipeEditForm/RecipeEditForm";

const getInitialState = (): CreateRecipeFormState => ({
  status: "idle",
  fields: {
    name: "",
    image: "",
    description: "",
    category: "",
    cuisine: "",
    ingredients: [],
    instructions: [],
    cookTime: "PT30M",
    keywords: [],
  },
});

export const AddRecipeButton = () => (
  <EntitySheet
    getInitialState={() => getInitialState()}
    action={createRecipeAction}
    editForm={RecipeEditForm}
    successMessage="Recipe created!"
    failureMessage="Recipe creation failed"
    sheetTitle="Create Recipe"
    sheetDescription="Create a new recipe for your app here. Click create when
              you&apos;re done."
    sheetTriggerText="Add Recipe"
    sheetTriggerIcon={Plus}
    sheetSubmitText="Create"
    sheetSubmittingText="Creating..."
  />
);
