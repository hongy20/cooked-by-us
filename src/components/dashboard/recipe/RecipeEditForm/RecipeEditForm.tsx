"use client";

import { FieldGroup, FieldSet } from "@/components/ui/field";
import type {
  CreateRecipeFields,
  CreateRecipeFormState,
  UpdateRecipeFields,
  UpdateRecipeFormState,
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

interface Props {
  fields: CreateRecipeFields | UpdateRecipeFields;
  action: (payload: FormData) => void;
  formId: string;
  errors?: CreateRecipeFormState["errors"] | UpdateRecipeFormState["errors"];
}

export const RecipeEditForm = ({ fields, action, formId, errors }: Props) => {
  return (
    <form id={formId} action={action} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          {"recipeId" in fields && fields.recipeId && (
            <input type="hidden" name="recipeId" value={fields.recipeId} />
          )}
          <FieldRecipeName
            name="name"
            defaultValue={fields.name}
            errors={errors?.name}
          />
          <FieldRecipeDescription
            name="description"
            defaultValue={fields.description}
            errors={errors?.description}
          />
          <FieldRecipeImage
            name="image"
            defaultValue={fields.image}
            errors={errors?.image}
          />
          <FieldRecipeCategory
            name="category"
            defaultValue={fields.category ?? undefined}
            errors={errors?.category}
          />
          <FieldRecipeCuisine
            name="cuisine"
            defaultValue={fields.cuisine ?? undefined}
            errors={errors?.cuisine}
          />
          <FieldRecipeIngredients
            name="ingredients"
            defaultValue={fields.ingredients}
            errors={errors?.ingredients}
          />
          <FieldRecipeInstructions
            name="instructions"
            defaultValue={fields.instructions}
            errors={errors?.instructions}
          />
          <FieldRecipeCookTime
            name="cookTime"
            defaultValue={fields.cookTime}
            errors={errors?.cookTime}
          />
          <FieldRecipeKeywords
            name="keywords"
            defaultValue={fields.keywords}
            errors={errors?.keywords}
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
