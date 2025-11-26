"use server";

import { z } from "zod";
import {
  createCuisine,
  deleteCuisine,
  getAllCuisines,
  updateCuisine,
} from "@/lib/dal/cuisine";
import { updateRecipesAfterCuisineDeletion } from "@/lib/dal/recipe";
import type { PersistedCuisine } from "@/lib/dal/types";
import { type CuisineInput, CuisineInputSchema } from "@/lib/validator/cuisine";
import type { FormState } from "./type";
import { authenticate, dupliatedKeyError } from "./utils";

export type CreateCuisineFields = CuisineInput;
export type CreateCuisineFormState = FormState<CreateCuisineFields>;

export const createCuisineAction = async (
  _prevState: CreateCuisineFormState,
  formData: FormData,
): Promise<CreateCuisineFormState> => {
  authenticate();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const validatedFields = CuisineInputSchema.safeParse(fields);
  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields,
      errors,
    };
  }

  try {
    await createCuisine(validatedFields.data);
    return { status: "success", fields };
  } catch (e) {
    if (dupliatedKeyError(e)) {
      return {
        status: "error",
        fields,
        errors: { name: ["Cuisine already exist"] },
      };
    }
    throw new Error("Cuisine creation failed");
  }
};

export type UpdateCuisineFields = CuisineInput & {
  cuisineId: string;
};
export type UpdateCuisineFormState = FormState<UpdateCuisineFields>;

export const updateCuisineAction = async (
  _prevState: UpdateCuisineFormState,
  formData: FormData,
): Promise<UpdateCuisineFormState> => {
  authenticate();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };
  const cuisineId = formData.get("cuisineId") as string;
  const patchedFields = { ...fields, cuisineId };

  const validatedFields = CuisineInputSchema.safeParse(fields);
  if (!validatedFields.success) {
    const errors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      status: "error",
      fields: patchedFields,
      errors,
    };
  }

  try {
    const updated = await updateCuisine(cuisineId, validatedFields.data);
    if (!updated) {
      throw new Error("Cuisine not found");
    }
    return { status: "success", fields: patchedFields };
  } catch (e) {
    if (dupliatedKeyError(e)) {
      return {
        status: "error",
        fields: patchedFields,
        errors: { name: ["Cuisine already exist"] },
      };
    }
    throw new Error("Cuisine updation failed");
  }
};

export const deleteCuisineAction = async (
  cuisineId: string,
): Promise<boolean> => {
  authenticate();

  const [deletionResult, updationResult] = await Promise.allSettled([
    deleteCuisine(cuisineId),
    updateRecipesAfterCuisineDeletion(cuisineId),
  ]);

  return (
    deletionResult.status === "fulfilled" &&
    updationResult.status === "fulfilled"
  );
};

export const getAllCuisinesAction = async (): Promise<PersistedCuisine[]> =>
  await getAllCuisines();
