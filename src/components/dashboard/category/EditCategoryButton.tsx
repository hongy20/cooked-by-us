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
  type UpdateCategoryFormState,
  updateCategoryAction,
} from "@/lib/action/category";
import type { PersistedCategory } from "@/lib/dal/types";
import { CategoryEditForm } from "./CategoryEditForm";

const getInitialState = (
  category: PersistedCategory,
): UpdateCategoryFormState => ({
  status: "idle",
  fields: {
    name: category.name,
    categoryId: category.id,
  },
});

type Props = { category: PersistedCategory };

export const EditCategoryButton = ({ category }: Props) => {
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
    async (prevState: UpdateCategoryFormState, formData: FormData) => {
      try {
        const rsp = await updateCategoryAction(prevState, formData);
        if (rsp.status === "success") {
          setIsDirty(false);
          setOpen(false);
          toast.success("Category updated!");
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
    getInitialState(category),
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
            <SheetTitle>Edit Category</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <CategoryEditForm
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
