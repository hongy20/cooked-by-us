"use client";

import { Edit } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type UpdateCategoryFormState,
  updateCategoryAction,
} from "@/lib/action/category";
import type { PersistedCategory } from "@/lib/dal/types";
import { CategoryEditForm } from "./CategoryEditForm";

const getInitialState = (
  category: PersistedCategory,
): UpdateCategoryFormState => ({
  status: "idle",
  fields: {
    name: category.name,
    categoryId: category.id,
  },
});

type Props = { category: PersistedCategory };

export const EditCategoryButton = ({ category }: Props) => (
  <EntitySheet
    getInitialState={() => getInitialState(category)}
    action={updateCategoryAction}
    editForm={CategoryEditForm}
    successMessage="Category updated!"
    failureMessage="Error"
    sheetTitle="Edit Category"
    sheetTriggerIcon={Edit}
    sheetSubmitText="Save"
    sheetSubmittingText="Saving..."
  />
);
