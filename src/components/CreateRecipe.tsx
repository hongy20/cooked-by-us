"use client";

import { useActionState } from "react";
import {
  type CreateRecipeFormState,
  createRecipeAction,
} from "@/lib/action/recipe";

const initialState: CreateRecipeFormState = {
  status: "idle",
  fields: {
    name: "",
    description: "",
    recipeCategory: "",
    recipeCuisine: "",
    cookTime: "",
  },
};

export const CreateRecipe = () => {
  const [state, action, pending] = useActionState(
    createRecipeAction,
    initialState,
  );

  return (
    <form className="flex flex-col items-start gap-2" action={action}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        placeholder="Recipe Name"
        defaultValue={state.fields.name}
      />
      {state.errors?.name && <p>{state.errors.name}</p>}
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        required
        placeholder="Recipe Description"
        defaultValue={state.fields.description}
      />
      {state.errors?.description && <p>{state.errors.description}</p>}
      <button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Recipe"}
      </button>
    </form>
  );
};
