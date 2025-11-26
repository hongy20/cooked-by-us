import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategoriesAction } from "@/lib/action/category";
import type { PersistedCategory } from "@/lib/dal/types";

interface Props {
  name: string;
  defaultValue: string | undefined;
  errors?: string[];
}

export const FieldRecipeCategory = ({ name, defaultValue, errors }: Props) => {
  const [categories, setCategories] = useState<PersistedCategory[]>([]);
  const [category, setCategory] = useState<string | undefined>(defaultValue);
  const id = useId();

  useEffect(() => {
    getAllCategoriesAction()
      .then(setCategories)
      .catch(() => toast.error("Unable to load categories"));
  });

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
          {categories.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
