"use client";

import { useId } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type {
  CreateCuisineFields,
  CreateCuisineFormState,
  UpdateCuisineFields,
  UpdateCuisineFormState,
} from "@/lib/action/cuisine";

interface Props {
  fields: CreateCuisineFields | UpdateCuisineFields;
  action: (payload: FormData) => void;
  formId: string;
  errors?: CreateCuisineFormState["errors"] | UpdateCuisineFormState["errors"];
}

export const CuisineEditForm = ({ fields, action, formId, errors }: Props) => {
  const nameFieldId = useId();

  return (
    <form id={formId} action={action} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={nameFieldId}>Name</FieldLabel>
            {"cuisineId" in fields && fields.cuisineId && (
              <input type="hidden" name="cuisineId" value={fields.cuisineId} />
            )}

            <Input
              id={nameFieldId}
              name="name"
              autoComplete="off"
              required
              data-1p-ignore
              placeholder="Cuisine Name"
              defaultValue={fields.name}
            />
            <FieldError
              errors={errors?.name?.map((message) => ({ message }))}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
