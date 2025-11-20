import { useId } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
}

export const FieldRecipeDescription = ({
  name,
  defaultValue,
  errors,
}: Props) => {
  const id = useId();
  return (
    <Field>
      <FieldLabel htmlFor={id}>Description</FieldLabel>
      <Textarea
        id={id}
        name={name}
        placeholder="Recipe Description"
        defaultValue={defaultValue}
      />
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
