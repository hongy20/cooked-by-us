"use client";

import { EntityDeletionDialog } from "@/components/dashboard/EntityDeletionDialog";
import { deleteCategoryAction } from "@/lib/action/category";

type Props = { categoryId: string };

export const DeleteCategoryButton = ({ categoryId }: Props) => (
  <EntityDeletionDialog
    action={() => deleteCategoryAction(categoryId)}
    dialogTitle="Delete Category"
    dialogDescription="This action cannot be undone. Are you sure you want to delete this
            category?"
    successMessage="Category deleted!"
    failureMessage="Category deletion failed"
  />
);
