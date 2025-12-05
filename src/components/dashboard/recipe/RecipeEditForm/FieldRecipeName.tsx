import { useId } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
  setDirty: () => void;
}

export const FieldRecipeName = ({
  name,
  defaultValue,
  errors,
  setDirty,
}: Props) => {
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
        onChange={setDirty}
      />
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
