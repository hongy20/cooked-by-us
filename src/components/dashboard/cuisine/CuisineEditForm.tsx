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
  setDirty: () => void;
  formId: string;
  errors?: CreateCuisineFormState["errors"] | UpdateCuisineFormState["errors"];
}

export const CuisineEditForm = ({
  fields,
  action,
  formId,
  errors,
  setDirty,
}: Props) => {
  const nameFieldId = useId();

  return (
    <form id={formId} action={action} className="space-y-4">
      {"cuisineId" in fields && fields.cuisineId && (
        <input type="hidden" name="cuisineId" value={fields.cuisineId} />
      )}
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={nameFieldId}>Name</FieldLabel>
            <Input
              id={nameFieldId}
              name="name"
              autoComplete="off"
              required
              data-1p-ignore
              placeholder="Cuisine Name"
              defaultValue={fields.name}
              onChange={setDirty}
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
