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
  error: string[] | undefined;
}

const ID = "category";

export const FieldRecipeCategory = ({ name, error }: Props) => {
  return (
    <Field>
      <FieldLabel htmlFor={ID}>Recipe Category</FieldLabel>
      <Select name={name}>
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
