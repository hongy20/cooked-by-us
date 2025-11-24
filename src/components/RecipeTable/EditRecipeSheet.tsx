"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { IPopulatedRecipe } from "@/lib/model";
import { RecipeEditForm } from "./RecipeEditForm";

type Props = { recipe: IPopulatedRecipe };

export const EditRecipeSheet = ({ recipe }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Recipe</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <RecipeEditForm recipe={recipe} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
