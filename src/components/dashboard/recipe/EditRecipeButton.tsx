"use client";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useId, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  type UpdateRecipeFormState,
  updateRecipeAction,
} from "@/lib/action/recipe";
import type { PersistedRecipe } from "@/lib/dal/types";
import { RecipeEditForm } from "./RecipeEditForm/RecipeEditForm";

const getInitialState = (recipe: PersistedRecipe): UpdateRecipeFormState => ({
  status: "idle",
  fields: {
    ...recipe,
    category: recipe.category?.id ?? null,
    cuisine: recipe.cuisine?.id ?? null,
    recipeId: recipe.id,
  },
});

type Props = { recipe: PersistedRecipe };

export const EditRecipeButton = ({ recipe }: Props) => {
  const formId = useId();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [state, action, pending] = useActionState(
    async (prevState: UpdateRecipeFormState, formData: FormData) => {
      try {
        const rsp = await updateRecipeAction(prevState, formData);
        if (rsp.status === "success") {
          closeRef.current?.click(); // Close sheet
          toast.success("Recipe updated!");
          router.refresh(); // Refresh the current page
        }
        return rsp;
      } catch (error) {
        toast.error(
          "Error",
          error instanceof Error ? { description: error.message } : undefined,
        );
        return prevState;
      }
    },
    getInitialState(recipe),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px] flex flex-col"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Edit Recipe</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <RecipeEditForm
            fields={state.fields}
            formId={formId}
            action={action}
            errors={state.errors}
          />
        </div>

        <SheetFooter className="border-t p-4">
          <Button type="submit" form={formId} disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" ref={closeRef}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
