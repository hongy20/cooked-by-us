"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  type CreateRecipeFormState,
  createRecipeAction,
} from "@/lib/action/recipe";
import { FieldRecipeCategory } from "./FieldRecipeCategory";
import { FieldRecipeCookTime } from "./FieldRecipeCookTime";
import { FieldRecipeCuisine } from "./FieldRecipeCuisine";
import { FieldRecipeDescription } from "./FieldRecipeDescription";
import { FieldRecipeImage } from "./FieldRecipeImage";
import { FieldRecipeIngredients } from "./FieldRecipeIngredients";
import { FieldRecipeInstructions } from "./FieldRecipeInstructions";
import { FieldRecipeKeywords } from "./FieldRecipeKeywords";
import { FieldRecipeName } from "./FieldRecipeName";

const initialState: CreateRecipeFormState = {
  status: "idle",
  fields: {
    name: "",
    image: "",
    description: "",
    category: "",
    cuisine: "",
    ingredients: [],
    instructions: [],
    cookTime: "PT30M",
    keywords: [],
  },
};

export const CreateRecipe = () => {
  const [state, action, pending] = useActionState(
    createRecipeAction,
    initialState,
  );

  return (
    <form action={action} className="flex-none w-full max-w-xl min-w-0 px-4">
      <FieldSet>
        <FieldLegend>New Recipe</FieldLegend>
        <FieldDescription>Create and publish new recipe 🚀</FieldDescription>
        <FieldGroup>
          <FieldRecipeName
            name="name"
            defaultValue={state.fields.name}
            errors={state.errors?.name}
          />
          <FieldRecipeDescription
            name="description"
            defaultValue={state.fields.description}
            errors={state.errors?.description}
          />
          <FieldRecipeImage
            name="image"
            defaultValue={state.fields.image}
            errors={state.errors?.image}
          />
          <FieldRecipeCategory
            name="category"
            defaultValue={state.fields.category}
            errors={state.errors?.category}
          />
          <FieldRecipeCuisine
            name="cuisine"
            defaultValue={state.fields.cuisine}
            errors={state.errors?.cuisine}
          />
          <FieldRecipeIngredients
            name="ingredients"
            defaultValue={state.fields.ingredients}
            errors={state.errors?.ingredients}
          />
          <FieldRecipeInstructions
            name="instructions"
            defaultValue={state.fields.instructions}
            errors={state.errors?.instructions}
          />
          <FieldRecipeCookTime
            name="cookTime"
            defaultValue={state.fields.cookTime}
            errors={state.errors?.cookTime}
          />
          <FieldRecipeKeywords
            name="keywords"
            defaultValue={state.fields.keywords}
            errors={state.errors?.keywords}
          />
          <Field orientation="horizontal">
            <Button type="submit" className="w-30 relative" disabled={pending}>
              {pending && <Spinner className="absolute left-3" />}
              Submit
            </Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
