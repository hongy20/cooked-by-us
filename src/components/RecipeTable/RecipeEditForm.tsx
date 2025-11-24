"use client";

import { useActionState, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IPopulatedRecipe } from "@/lib/model";

type Props = { recipe: IPopulatedRecipe };

export const RecipeEditForm = ({ recipe }: Props) => {
  const [state, formAction] = useActionState(updateRecipe, null);
  const id = useId();

  // Prefill logic can come from props or useSWR, etc.
  // For now: placeholder
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={id} />

      <div className="space-y-1">
        <label htmlFor={id} className="text-sm">
          Name
        </label>
        <Input id={id} name="name" defaultValue={state?.name ?? ""} />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
};
