"use server";

import { z } from "zod";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/lib/dal/category";
import { updateRecipesAfterCategoryDeletion } from "@/lib/dal/recipe";
import type { PersistedCategory } from "@/lib/dal/types";
import {
  type CategoryInput,
  CategoryInputSchema,
} from "@/lib/validator/category";
import type { FormState } from "./type";
import { authenticate, dupliatedKeyError } from "./utils";

export type CreateCategoryFields = CategoryInput;
export type CreateCategoryFormState = FormState<CreateCategoryFields>;

export const createCategoryAction = async (
  _prevState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> => {
  await authenticate();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const validatedFields = CategoryInputSchema.safeParse(fields);
  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields,
      errors,
    };
  }

  try {
    await createCategory(validatedFields.data);
    return { status: "success", fields };
  } catch (e) {
    if (dupliatedKeyError(e)) {
      return {
        status: "error",
        fields,
        errors: { name: ["Category already exist"] },
      };
    }
    throw new Error("Category creation failed");
  }
};

export type UpdateCategoryFields = CategoryInput & {
  categoryId: string;
};
export type UpdateCategoryFormState = FormState<UpdateCategoryFields>;

export const updateCategoryAction = async (
  _prevState: UpdateCategoryFormState,
  formData: FormData,
): Promise<UpdateCategoryFormState> => {
  await authenticate();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const categoryId = formData.get("categoryId") as string;
  const patchedFields = { ...fields, categoryId };

  const validatedFields = CategoryInputSchema.safeParse(fields);
  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields: patchedFields,
      errors,
    };
  }

  try {
    const updated = await updateCategory(categoryId, validatedFields.data);
    if (!updated) {
      throw new Error("Category not found");
    }
    return { status: "success", fields: patchedFields };
  } catch (e) {
    if (dupliatedKeyError(e)) {
      return {
        status: "error",
        fields: patchedFields,
        errors: { name: ["Category already exist"] },
      };
    }
    throw new Error("Category updation failed");
  }
};

export const deleteCategoryAction = async (
  categoryId: string,
): Promise<boolean> => {
  await authenticate();

  const [deletionResult, updationResult] = await Promise.allSettled([
    deleteCategory(categoryId),
    updateRecipesAfterCategoryDeletion(categoryId),
  ]);

  return (
    deletionResult.status === "fulfilled" &&
    updationResult.status === "fulfilled"
  );
};

export const getAllCategoriesAction = async (): Promise<PersistedCategory[]> =>
  await getAllCategories();
