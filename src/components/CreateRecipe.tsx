"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  type CreateRecipeFormState,
  createRecipeAction,
} from "@/lib/action/recipe";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "@/lib/constant";

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
    <form action={action} className="w-full max-w-lg">
      <FieldSet>
        <FieldLegend>New Recipe</FieldLegend>
        <FieldDescription>Create and publish new recipe 🚀</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              required
              placeholder="Recipe Name"
              defaultValue={state.fields.name}
            />
            <FieldError>{state.errors?.name}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Recipe Description"
              defaultValue={state.fields.description}
            />
            <FieldError>{state.errors?.description}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Recipe Category</FieldLabel>
            <Select name="recipeCategory">
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {RECIPE_CATEGORY.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{state.errors?.recipeCategory}</FieldError>
          </Field>
          <Field>
            <FieldLabel>Recipe Cuisine</FieldLabel>
            <Select name="recipeCuisine">
              <SelectTrigger>
                <SelectValue placeholder="Choose cuisine" />
              </SelectTrigger>
              <SelectContent>
                {RECIPE_CUISINE.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{state.errors?.recipeCuisine}</FieldError>
          </Field>
          <Field>
            <FieldTitle>Cook Time</FieldTitle>
            <Slider defaultValue={[30]} max={600} min={10} step={1} />
            <FieldError>{state.errors?.cookTime}</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit" disabled={pending}>
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
