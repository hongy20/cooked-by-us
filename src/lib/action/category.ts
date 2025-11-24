"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { createCategory, deleteCategory } from "@/lib/dal/category";
import {
  type CategoryInput,
  CategoryValidator,
} from "@/lib/validator/category";
import { updateRecipesAfterCategoryDeletion } from "../dal/recipe";
import type { FormState } from "./type";

export type CreateCategoryFormState = FormState<CategoryInput>;

export const createCategoryAction = async (
  _prevState: CreateCategoryFormState,
  formData: FormData,
): Promise<CreateCategoryFormState> => {
  const session = await getSession();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };

  if (!session) {
    return { status: "error", fields, message: "You have to login first" };
  }

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
    return {
      status: "error",
      fields,
      message: isDupliatedKeyError
        ? "Category already exist"
        : "Category creation failed",
    };
  }

  redirect(`/dashboard/category`);
};

export async function deleteCategoryAction(categoryId: string) {
  const session = await getSession();
  if (!session) {
    // TODO: handle unauthorized access
    return { status: "error", message: "You have to login first" };
  }

  // TODO: find out what need to be returned
  await deleteCategory(categoryId);
  await updateRecipesAfterCategoryDeletion(categoryId);
}
