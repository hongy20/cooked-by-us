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

export const EditCuisineSheet = ({ cuisine }: Props) => {
  const formId = useId();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [state, action, pending] = useActionState(
    async (prevState: UpdateCuisineFormState, formData: FormData) => {
      try {
        const rsp = await updateCuisineAction(prevState, formData);
        if (rsp.status === "success") {
          closeRef.current?.click(); // Close sheet
          toast.success("Cuisine updated!");
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
    getInitialState(cuisine),
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
        className="w-full sm:max-w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Edit Cuisine</SheetTitle>
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
