"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCuisineAction } from "@/lib/action/cuisine";

type Props = { cuisineId: string };

export const DeleteCuisineButton = ({ cuisineId }: Props) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Cuisine</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            cuisine?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() =>
              startTransition(
                async () =>
                  await deleteCuisineAction(cuisineId)
                    .then((ok) => {
                      if (ok) {
                        toast.success("Cuisine deleted!");
                        router.refresh();
                      } else {
                        toast.error("Cuisine deletion failed");
                      }
                    })
                    .catch((error: Error) => {
                      toast.error("Cuisine deletion failed", {
                        description: error.message,
                      });
                    }),
              )
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
