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

type Props = {
  action: () => Promise<boolean>;
  dialogTitle: string;
  dialogDescription: string;
  successMessage: string;
  failureMessage: string;
};

export const EntityDeletionDialog = ({
  action,
  dialogTitle,
  dialogDescription,
  successMessage,
  failureMessage,
}: Props) => {
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
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() =>
              startTransition(
                async () =>
                  await action()
                    .then((ok) => {
                      if (ok) {
                        toast.success(successMessage);
                        router.refresh();
                      } else {
                        toast.error(failureMessage);
                      }
                    })
                    .catch((error) => {
                      toast.error(failureMessage, {
                        description:
                          error instanceof Error
                            ? error.message
                            : String(error),
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
