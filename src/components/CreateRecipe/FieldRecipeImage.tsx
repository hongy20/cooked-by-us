import { useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  name: string;
  defaultValue: string;
  error: string[] | undefined;
}

const ID = "image";
const FILE_LIMIT_IN_MB = 2;

export const FieldRecipeImage = ({ name, defaultValue, error }: Props) => {
  const [clientError, setClientError] = useState<string | null>(null);

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Image</FieldLabel>
      <Input
        id={ID}
        name={name}
        type="file"
        accept="image/*"
        required={!defaultValue}
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (
            file instanceof File &&
            file.size > FILE_LIMIT_IN_MB * 1024 * 1024
          ) {
            setClientError(`File must be smaller than ${FILE_LIMIT_IN_MB}MB`);
            // 🔥 Reset file input
            e.target.value = "";
          } else {
            setClientError(null);
          }
        }}
      />
      {defaultValue && (
        <FieldDescription>Image uploaded: {defaultValue}</FieldDescription>
      )}
      <FieldError>{clientError || error}</FieldError>
    </Field>
  );
};
