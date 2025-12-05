"use client";

import { EntityDeletionDialog } from "@/components/dashboard/EntityDeletionDialog";
import { deleteRecipeAction } from "@/lib/action/recipe";

type Props = { recipeId: string };

export const DeleteRecipeButton = ({ recipeId }: Props) => (
  <EntityDeletionDialog
    action={() => deleteRecipeAction(recipeId)}
    dialogTitle="Delete Recipe"
    dialogDescription="This action cannot be undone. Are you sure you want to delete this recipe?"
    successMessage="Recipe deleted!"
    failureMessage="Recipe deletion failed!"
  />
);
