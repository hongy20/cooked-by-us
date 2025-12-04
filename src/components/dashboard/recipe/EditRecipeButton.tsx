"use client";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useId, useState } from "react";
import { toast } from "sonner";
import { UnsavedChangesDialog } from "@/components/dashboard/UnsavedChangesDialog";
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
import { useUnsavedChangesGuard } from "@/hooks/use-unsaved-changes-guard";
import {
  type UpdateRecipeFormState,
  updateRecipeAction,
} from "@/lib/action/recipe";
import type { PersistedRecipe } from "@/lib/dal/types";
import { RecipeEditForm } from "./RecipeEditForm/RecipeEditForm";

const getInitialState = (recipe: PersistedRecipe): UpdateRecipeFormState => ({
  status: "idle",
  fields: {
    recipeId: recipe.id,
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    category: recipe.category?.id ?? null,
    cuisine: recipe.cuisine?.id ?? null,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cookTime: recipe.cookTime,
    keywords: recipe.keywords,
  },
});

type Props = { recipe: PersistedRecipe };

export const EditRecipeButton = ({ recipe }: Props) => {
  const formId = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const {
    unsavedChangesDialogOpen,
    setUnsavedChangesDialogOpen,
    requestClose,
    confirmClose,
  } = useUnsavedChangesGuard({
    isDirty,
    onConfirm: () => {
      setIsDirty(false);
      setOpen(false);
    },
  });

  const [state, action, pending] = useActionState(
    async (prevState: UpdateRecipeFormState, formData: FormData) => {
      try {
        const rsp = await updateRecipeAction(prevState, formData);
        if (rsp.status === "success") {
          setIsDirty(false);
          setOpen(false);
          toast.success("Recipe updated!");
          router.refresh(); // Refresh the current page
        }
        return rsp;
      } catch (error) {
        toast.error(
          "Recipe update failed",
          error instanceof Error ? { description: error.message } : undefined,
        );
        return { ...prevState, status: "error" as const };
      }
    },
    getInitialState(recipe),
  );

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) requestClose();
          else setOpen(true);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-[500px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>Edit Recipe</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <RecipeEditForm
              fields={state.fields}
              formId={formId}
              action={action}
              setDirty={() => setIsDirty(true)}
              errors={state.errors}
            />
          </div>

          <SheetFooter className="border-t p-4">
            <Button type="submit" form={formId} disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <UnsavedChangesDialog
        open={unsavedChangesDialogOpen}
        onOpenChange={setUnsavedChangesDialogOpen}
        onConfirm={confirmClose}
      />
    </>
  );
};
