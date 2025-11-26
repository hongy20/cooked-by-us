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
  CreateCategoryFields,
  CreateCategoryFormState,
  UpdateCategoryFields,
  UpdateCategoryFormState,
} from "@/lib/action/category";

interface Props {
  fields: CreateCategoryFields | UpdateCategoryFields;
  action: (payload: FormData) => void;
  formId: string;
  errors?:
    | CreateCategoryFormState["errors"]
    | UpdateCategoryFormState["errors"];
}

export const CategoryEditForm = ({ fields, action, formId, errors }: Props) => {
  const nameFieldId = useId();

  return (
    <form id={formId} action={action} className="space-y-4">
      {"categoryId" in fields && fields.categoryId && (
        <input type="hidden" name="categoryId" value={fields.categoryId} />
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
              placeholder="Category Name"
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
