import { useId } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
}

export const FieldRecipeName = ({ name, defaultValue, errors }: Props) => {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Name</FieldLabel>
      <Input
        id={id}
        name={name}
        autoComplete="off"
        required
        placeholder="Recipe Name"
        defaultValue={defaultValue}
      />
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
