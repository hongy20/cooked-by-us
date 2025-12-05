"use client";

import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useId, useState } from "react";
import { toast } from "sonner";
import { UnsavedChangesDialog } from "@/components/dashboard/UnsavedChangesDialog";
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
import { useUnsavedChangesGuard } from "@/hooks/use-unsaved-changes-guard";
import type { FormState } from "@/lib/action/type";

type Props<FormFields> = {
  getInitialState: () => FormState<FormFields>;
  action: (
    prevState: FormState<FormFields>,
    formData: FormData,
  ) => Promise<FormState<FormFields>>;
  editForm: React.ComponentType<{
    fields: FormFields;
    action: (payload: FormData) => void;
    setDirty: () => void;
    formId: string;
    errors?: FormState<FormFields>["errors"];
  }>;
  successMessage: string;
  failureMessage: string;
  sheetTitle: string;
  sheetDescription?: string;
  sheetSubmitText: string;
  sheetSubmittingText: string;
  sheetCloseText?: string;
} & (
  | { sheetTriggerText: string; sheetTriggerIcon?: LucideIcon }
  | { sheetTriggerText?: string; sheetTriggerIcon: LucideIcon }
);

export const EntitySheet = <FormFields,>({
  getInitialState,
  action,
  editForm: EditForm,
  successMessage,
  failureMessage,
  sheetTitle,
  sheetDescription,
  sheetTriggerText,
  sheetTriggerIcon: SheetTriggerIcon,
  sheetSubmitText,
  sheetSubmittingText,
  sheetCloseText = "Close",
}: Props<FormFields>) => {
  const formId = useId();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const {
    unsavedChangesDialogOpen,
    setUnsavedChangesDialogOpen,
    requestClose,
    confirmClose,
  } = useUnsavedChangesGuard({
    isDirty,
    onConfirm: () => {
      setIsDirty(false);
      setOpen(false);
    },
  });

  const [state, doAction, pending] = useActionState(
    async (prevState: FormState<FormFields>, formData: FormData) => {
      try {
        const rsp = await action(prevState, formData);
        if (rsp.status === "success") {
          setIsDirty(false);
          setOpen(false);
          toast.success(successMessage);
          router.refresh(); // Refresh the current page
          return getInitialState(); // Reset form for next use
        }
        return rsp;
      } catch (error) {
        toast.error(
          failureMessage,
          error instanceof Error ? { description: error.message } : undefined,
        );
        return prevState;
      }
    },
    getInitialState(),
  );

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) requestClose();
          else setOpen(true);
        }}
      >
        <SheetTrigger asChild>
          <Button
            variant={sheetTriggerText ? "default" : "ghost"}
            size={sheetTriggerText ? "default" : "icon"}
            className="gap-2"
          >
            {SheetTriggerIcon && <SheetTriggerIcon className="h-4 w-4" />}
            {sheetTriggerText}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-[500px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>{sheetTitle}</SheetTitle>
            {sheetDescription && (
              <SheetDescription>{sheetDescription}</SheetDescription>
            )}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <EditForm
              fields={state.fields}
              formId={formId}
              action={doAction}
              setDirty={() => setIsDirty(true)}
              errors={state.errors}
            />
          </div>

          <SheetFooter className="border-t p-4">
            <Button type="submit" form={formId} disabled={pending}>
              {pending ? sheetSubmittingText : sheetSubmitText}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">{sheetCloseText}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <UnsavedChangesDialog
        open={unsavedChangesDialogOpen}
        onOpenChange={setUnsavedChangesDialogOpen}
        onConfirm={confirmClose}
      />
    </>
  );
};
