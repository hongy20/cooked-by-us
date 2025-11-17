import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface Props {
  name: string;
  defaultValue: string;
  error: string[] | undefined;
}

const ID = "description";

export const FieldRecipeDescription = ({
  name,
  defaultValue,
  error,
}: Props) => {
  return (
    <Field>
      <FieldLabel htmlFor={ID}>Description</FieldLabel>
      <Textarea
        id={ID}
        name={name}
        placeholder="Recipe Description"
        defaultValue={defaultValue}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
};
