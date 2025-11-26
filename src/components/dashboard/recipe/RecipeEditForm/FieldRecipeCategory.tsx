import { useId, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RECIPE_CATEGORY } from "@/lib/constant";

interface Props {
  name: string;
  defaultValue: string | undefined;
  errors?: string[];
}

export const FieldRecipeCategory = ({ name, defaultValue, errors }: Props) => {
  const [category, setCategory] = useState<string | undefined>(defaultValue);
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
