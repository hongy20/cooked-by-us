import { useState } from "react";
import { RECIPE_CATEGORY } from "@/lib/constant";
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
  error: string[] | undefined;
}

const ID = "category";

export const FieldRecipeCategory = ({ name, defaultValue, error }: Props) => {
  const [category, setCategory] = useState<string>(defaultValue);

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Recipe Category</FieldLabel>

      {/* Prevent form from losing the selected value */}
      <input type="hidden" name={name} value={category} />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger id={ID}>
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
      <FieldError>{error}</FieldError>
    </Field>
  );
};
