"use client";

import { Plus } from "lucide-react";
import { EntitySheet } from "@/components/dashboard/EntitySheet";
import {
  type CreateCuisineFormState,
  createCuisineAction,
} from "@/lib/action/cuisine";
import { CuisineEditForm } from "./CuisineEditForm";

const getInitialState = (): CreateCuisineFormState => ({
  status: "idle",
  fields: {
    name: "",
  },
});

export const AddCuisineButton = () => (
  <EntitySheet
    getInitialState={getInitialState}
    action={createCuisineAction}
    editForm={CuisineEditForm}
    successMessage="Cuisine created!"
    failureMessage="Cuisine creation failed"
    sheetTitle="Create Cuisine"
    sheetDescription="Create a new cuisine for your recipes."
    sheetTriggerText="Add Cuisine"
    sheetTriggerIcon={Plus}
    sheetSubmitText="Create"
    sheetSubmittingText="Creating..."
  />
);
