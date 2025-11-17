import { useState } from "react";
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
  defaultValue: string | undefined;
  error: string[] | undefined;
}

const ID = "cuisine";

export const FieldRecipeCuisine = ({ name, defaultValue, error }: Props) => {
  const [cuisine, setCuisine] = useState<string | undefined>(defaultValue);

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Recipe Cuisine</FieldLabel>
      <Select name={name} value={cuisine} onValueChange={setCuisine}>
        <SelectTrigger id={ID}>
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
      <FieldError>{error}</FieldError>
    </Field>
  );
};
