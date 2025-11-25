"use client";

import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId } from "react";
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
  type UpdateCategoryFormState,
  updateCategoryAction,
} from "@/lib/action/category";
import type { ICategory } from "@/lib/model";
import { CategoryEditForm } from "./CategoryEditForm";

const getInitialState = (category: ICategory): UpdateCategoryFormState => ({
  status: "idle",
  fields: {
    name: category.name,
    categoryId: `${category._id}`,
  },
});

type Props = { category: ICategory };

export const EditCategoryButton = ({ category }: Props) => {
  const formId = useId();
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (prevState: UpdateCategoryFormState, formData: FormData) =>
      await updateCategoryAction(prevState, formData).catch((error) => {
        toast.error(
          "Error",
          error instanceof Error ? { description: error.message } : undefined,
        );
        return prevState;
      }),
    getInitialState(category),
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Category updated!");
      router.refresh();
    }
  }, [state.status, router]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
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
            {pending ? "Saving..." : "Save"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
