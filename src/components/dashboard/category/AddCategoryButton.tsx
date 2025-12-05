"use client";

import { Plus } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type CreateCategoryFormState,
  createCategoryAction,
} from "@/lib/action/category";
import { CategoryEditForm } from "./CategoryEditForm";

const getInitialState = (): CreateCategoryFormState => ({
  status: "idle",
  fields: {
    name: "",
  },
});

export const AddCategoryButton = () => (
  <EntitySheet
    getInitialState={getInitialState}
    action={createCategoryAction}
    editForm={CategoryEditForm}
    successMessage="Category created!"
    failureMessage="Category creation failed"
    sheetTitle="Create Category"
    sheetDescription="Create a new category for your recipes."
    sheetTriggerText="Add Category"
    sheetTriggerIcon={Plus}
    sheetSubmitText="Create"
    sheetSubmittingText="Creating..."
  />
);
