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
  type CreateCategoryFormState,
  createCategoryAction,
} from "@/lib/action/category";
import { CategoryEditForm } from "./CategoryEditForm";

const getInitialState = (): CreateCategoryFormState => ({
  status: "idle",
  fields: {
    name: "",
  },
});

export function AddCategoryButton() {
  const formId = useId();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [state, action, pending] = useActionState(
    async (prevState: CreateCategoryFormState, formData: FormData) => {
      try {
        const rsp = await createCategoryAction(prevState, formData);
        if (rsp.status === "success") {
          closeRef.current?.click(); // Close sheet
          toast.success("Category created!");
          router.refresh();
        }
        return rsp;
      } catch (error) {
        toast.error(
          "Category creation failed",
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
          Add Category
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>
            Create a new category for your recipes.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <CategoryEditForm
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
