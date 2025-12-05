"use client";

import { Edit } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type UpdateCuisineFormState,
  updateCuisineAction,
} from "@/lib/action/cuisine";
import type { PersistedCuisine } from "@/lib/dal/types";
import { CuisineEditForm } from "./CuisineEditForm";

const getInitialState = (
  cuisine: PersistedCuisine,
): UpdateCuisineFormState => ({
  status: "idle",
  fields: {
    name: cuisine.name,
    cuisineId: cuisine.id,
  },
});

type Props = { cuisine: PersistedCuisine };

export const EditCuisineButton = ({ cuisine }: Props) => (
  <EntitySheet
    getInitialState={() => getInitialState(cuisine)}
    action={updateCuisineAction}
    editForm={CuisineEditForm}
    successMessage="Cuisine updated!"
    failureMessage="Error"
    sheetTitle="Edit Cuisine"
    sheetTriggerIcon={Edit}
    sheetSubmitText="Save"
    sheetSubmittingText="Saving..."
  />
);
