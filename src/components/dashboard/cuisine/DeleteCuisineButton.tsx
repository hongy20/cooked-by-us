"use client";

import { EntityDeletionDialog } from "@/components/dashboard/EntityDeletionDialog";
import { deleteCuisineAction } from "@/lib/action/cuisine";

type Props = { cuisineId: string };

export const DeleteCuisineButton = ({ cuisineId }: Props) => (
  <EntityDeletionDialog
    action={() => deleteCuisineAction(cuisineId)}
    dialogTitle="Delete Cuisine"
    dialogDescription="This action cannot be undone. Are you sure you want to delete this cuisine?"
    successMessage="Cuisine deleted!"
    failureMessage="Cuisine deletion failed"
  />
);
