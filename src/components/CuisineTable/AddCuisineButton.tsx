"use client";

import { Plus } from "lucide-react";
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

export function AddCuisineButton() {
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
        className="w-[500px]"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Create Cuisine</SheetTitle>
        </SheetHeader>

        <div className="mt-4">{/* <CuisineCreateForm /> */}</div>

        <SheetFooter>
          <Button type="submit">Create</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
