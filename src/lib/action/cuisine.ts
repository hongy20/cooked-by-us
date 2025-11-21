"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { createCuisine } from "@/lib/dal/cuisine";
import { type CuisineInput, CuisineValidator } from "@/lib/validator/cuisine";
import type { FormState } from "./type";

export type CreateCuisineFormState = FormState<CuisineInput>;

export const createCuisineAction = async (
  _prevState: CreateCuisineFormState,
  formData: FormData,
): Promise<CreateCuisineFormState> => {
  const session = await getSession();

  // 1. Validate form data
  const fields = {
    name: formData.get("name") as string,
  };

  if (!session) {
    return { status: "error", fields, message: "You have to login first" };
  }

  const validatedFields = CuisineValidator.safeParse(fields);
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
  } catch (e) {
    console.error(e);
    const isDupliatedKeyError =
      e instanceof Object && "code" in e && e.code === 11000;
    return {
      status: "error",
      fields,
      message: isDupliatedKeyError
        ? "Cuisine already exist"
        : "Cuisine creation failed",
    };
  }

  redirect(`/dashboard/cuisine`);
};
