import { useId, useState } from "react";
import { RECIPE_CUISINE } from "@/lib/constant";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
}

export const FieldRecipeCuisine = ({ name, defaultValue, errors }: Props) => {
  const [cuisine, setCuisine] = useState<string>(defaultValue);
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Recipe Cuisine</FieldLabel>

      {/* Prevent form from losing the selected value */}
      <input type="hidden" name={name} value={cuisine} />

      <Select value={cuisine} onValueChange={setCuisine}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Choose cuisine" />
        </SelectTrigger>
        <SelectContent>
          {RECIPE_CUISINE.map((cuisineOption) => (
            <SelectItem key={cuisineOption} value={cuisineOption}>
              {cuisineOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
