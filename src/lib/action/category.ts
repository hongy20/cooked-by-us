"use server";

import { z } from "zod";
import { getSession } from "@/lib/auth";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/dal/category";
import { updateRecipesAfterCategoryDeletion } from "@/lib/dal/recipe";
import {
  type CategoryInput,
  CategoryValidator,
} from "@/lib/validator/category";
import type { FormState } from "./type";

export type CreateCategoryFields = CategoryInput;
export type CreateCategoryFormState = FormState<CreateCategoryFields>;

export const createCategoryAction = async (
  _prevState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> => {
  const session = await getSession();
  if (!session) {
    throw new Error("You have to login first");
  }

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const validatedFields = CategoryValidator.safeParse(fields);
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
  } catch (e) {
    console.error(e);
    const isDupliatedKeyError =
      e instanceof Object && "code" in e && e.code === 11000;
    throw new Error(
      isDupliatedKeyError
        ? "Category already exist"
        : "Category creation failed",
    );
  }

  return { status: "success", fields };
};

export type UpdateCategoryFields = CategoryInput & {
  categoryId: string;
};
export type UpdateCategoryFormState = FormState<UpdateCategoryFields>;

export const updateCategoryAction = async (
  _prevState: UpdateCategoryFormState,
  formData: FormData,
): Promise<UpdateCategoryFormState> => {
  const session = await getSession();
  if (!session) {
    throw new Error("You have to login first");
  }

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const categoryId = formData.get("categoryId") as string;
  const patchedFields = { ...fields, categoryId };

  const validatedFields = CategoryValidator.safeParse(fields);
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
  } catch (e) {
    console.error(e);
    const isDupliatedKeyError =
      e instanceof Object && "code" in e && e.code === 11000;
    throw new Error(
      isDupliatedKeyError
        ? "Category already exist"
        : "Category updation failed",
    );
  }

  return { status: "success", fields: patchedFields };
};

export const deleteCategoryAction = async (categoryId: string) => {
  const session = await getSession();
  if (!session) {
    throw new Error("You have to login first");
  }

  await deleteCategory(categoryId);
  await updateRecipesAfterCategoryDeletion(categoryId);
};
