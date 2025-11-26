"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useId, useRef } from "react";
import { toast } from "sonner";
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
  const closeRef = useRef<HTMLButtonElement>(null);

  const [state, action, pending] = useActionState(
    async (prevState: CreateCuisineFormState, formData: FormData) => {
      try {
        const rsp = await createCuisineAction(prevState, formData);
        if (rsp.status === "success") {
          closeRef.current?.click(); // Close sheet
          toast.success("Cuisine created!");
          router.refresh(); // Refresh the current page
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
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Cuisine
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Create Cuisine</SheetTitle>
          <SheetDescription>
            Create a new cuisine for your recipes.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <CuisineEditForm
            fields={state.fields}
            formId={formId}
            action={action}
            errors={state.errors}
          />
        </div>

        <SheetFooter>
          <Button type="submit" form={formId} disabled={pending}>
            {pending ? "Creating..." : "Create"}
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
}
