"use client";

import type {
  CreateRecipeFields,
  CreateRecipeFormState,
  UpdateRecipeFields,
  UpdateRecipeFormState,
} from "@/lib/action/recipe";

interface Props {
  fields: CreateRecipeFields | UpdateRecipeFields;
  action: (payload: FormData) => void;
  formId: string;
  errors?: CreateRecipeFormState["errors"] | UpdateRecipeFormState["errors"];
}

export const RecipeEditForm = ({ fields, action, formId, errors }: Props) => {
  // Import components from CreateRecipeDialog
  return <form id={formId} action={action} className="space-y-4"></form>;
};
