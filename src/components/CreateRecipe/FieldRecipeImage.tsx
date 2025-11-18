import { useId, useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
}

const FILE_SIZE_LIMIT_IN_MB = 2;

export const FieldRecipeImage = ({ name, defaultValue, errors }: Props) => {
  const [clientError, setClientError] = useState<string | null>(null);
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Image</FieldLabel>
      <Input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        required={!defaultValue}
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (
            file instanceof File &&
            file.size > FILE_SIZE_LIMIT_IN_MB * 1024 * 1024
          ) {
            setClientError(
              `File must be smaller than ${FILE_SIZE_LIMIT_IN_MB}MB`,
            );
            // Reset file input
            e.target.value = "";
          } else {
            setClientError(null);
          }
        }}
      />
      {defaultValue && (
        <FieldDescription>Image uploaded: {defaultValue}</FieldDescription>
      )}
      <FieldError
        errors={
          clientError
            ? [{ message: clientError }]
            : errors?.map((message) => ({ message }))
        }
      />
    </Field>
  );
};
