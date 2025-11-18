import { useId, useState } from "react";
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
  errors?: string[];
}

export const FieldRecipeCategory = ({ name, defaultValue, errors }: Props) => {
  const [category, setCategory] = useState<string>(defaultValue);
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Recipe Category</FieldLabel>

      {/* Prevent form from losing the selected value */}
      <input type="hidden" name={name} value={category} />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger id={id}>
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
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
