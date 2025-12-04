"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useId, useState } from "react";
import { toast } from "sonner";
import { UnsavedChangesDialog } from "@/components/dashboard/UnsavedChangesDialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUnsavedChangesGuard } from "@/hooks/use-unsaved-changes-guard";
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

export function AddCuisineButton() {
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
    async (prevState: CreateCuisineFormState, formData: FormData) => {
      try {
        const rsp = await createCuisineAction(prevState, formData);
        if (rsp.status === "success") {
          setIsDirty(false);
          setOpen(false);
          toast.success("Cuisine created!");
          router.refresh(); // Refresh the current page
          return getInitialState(); // Reset form for next use
        }
        return rsp;
      } catch (error) {
        toast.error(
          "Cuisine creation failed",
          error instanceof Error ? { description: error.message } : undefined,
        );
        return prevState;
      }
    },
    getInitialState(),
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Cuisine
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-[500px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>Create Cuisine</SheetTitle>
            <SheetDescription>
              Create a new cuisine for your recipes.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <CuisineEditForm
              fields={state.fields}
              formId={formId}
              action={action}
              setDirty={() => setIsDirty(true)}
              errors={state.errors}
            />
          </div>

          <SheetFooter className="border-t p-4">
            <Button type="submit" form={formId} disabled={pending}>
              {pending ? "Creating..." : "Create"}
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
}
