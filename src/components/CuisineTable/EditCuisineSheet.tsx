import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ICuisine } from "@/lib/model";
import { CuisineEditForm } from "./CuisineEditForm";

type Props = { cuisine: ICuisine };

export const EditCuisineSheet = ({ cuisine }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Cuisine</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <CuisineEditForm cuisine={cuisine} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
