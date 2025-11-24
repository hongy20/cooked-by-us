import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AddCuisineButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Cuisine
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Create Cuisine</SheetTitle>
        </SheetHeader>

        <div className="mt-4">{/* <CuisineCreateForm /> */}</div>
      </SheetContent>
    </Sheet>
  );
}
