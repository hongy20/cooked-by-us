import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  name: string;
  defaultValue: string;
  error: string[] | undefined;
}

const ID = "image";

export const FieldRecipeImage = ({ name, defaultValue, error }: Props) => {
  return (
    <Field>
      <FieldLabel htmlFor={ID}>Image</FieldLabel>
      <Input
        id={ID}
        name={name}
        type="file"
        accept="image/*"
        required={!defaultValue}
      />
      {defaultValue && (
        <FieldDescription>Image uploaded: {defaultValue}</FieldDescription>
      )}
      <FieldError>{error}</FieldError>
    </Field>
  );
};
