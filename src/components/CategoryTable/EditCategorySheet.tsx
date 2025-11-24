import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ICategory } from "@/lib/model";
import { CategoryEditForm } from "./CategoryEditForm";

type Props = { category: ICategory };

export const EditCategorySheet = ({ category }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <CategoryEditForm category={category} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
