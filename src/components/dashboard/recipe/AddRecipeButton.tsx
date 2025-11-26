import { Plus } from "lucide-react";
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
  type CreateRecipeFormState,
  createRecipeAction,
} from "@/lib/action/recipe";
import { RecipeEditForm } from "./RecipeEditForm";

const getInitialState = (): CreateRecipeFormState => ({
  status: "idle",
  fields: {
    name: "",
    image: "",
    description: "",
    category: "",
    cuisine: "",
    ingredients: [],
    instructions: [],
    cookTime: "PT30M",
    keywords: [],
  },
});

export function AddRecipeButton() {
  const formId = useId();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [state, action, pending] = useActionState(
    async (prevState: CreateRecipeFormState, formData: FormData) => {
      try {
        const rsp = await createRecipeAction(prevState, formData);
        if (rsp.status === "success") {
          closeRef.current?.click(); // Close sheet
          toast.success("Category created!");
          router.refresh(); // Refresh the current page
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
          Add Recipe
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Create Recipe</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <RecipeEditForm
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
