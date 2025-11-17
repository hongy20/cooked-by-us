import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  name: string;
  defaultValue: string;
  error: string[] | undefined;
}

const ID = "name";

export const FieldRecipeName = ({ name, defaultValue, error }: Props) => {
  return (
    <Field>
      <FieldLabel htmlFor={ID}>Name</FieldLabel>
      <Input
        id={ID}
        name={name}
        autoComplete="off"
        required
        placeholder="Recipe Name"
        defaultValue={defaultValue}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
};
