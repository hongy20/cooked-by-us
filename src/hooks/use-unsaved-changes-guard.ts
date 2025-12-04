"use client";

import { useCallback, useState } from "react";

type Options = {
  isDirty: boolean;
  onConfirm: () => void;
};

export function useUnsavedChangesGuard({ isDirty, onConfirm }: Options) {
  const [unsavedChangesDialogOpen, setUnsavedChangesDialogOpen] =
    useState(false);

  const requestClose = useCallback(() => {
    if (isDirty) {
      setUnsavedChangesDialogOpen(true);
    } else {
      onConfirm();
    }
  }, [isDirty, onConfirm]);

  const confirmClose = useCallback(() => {
    setUnsavedChangesDialogOpen(false);
    onConfirm();
  }, [onConfirm]);

  return {
    unsavedChangesDialogOpen,
    setUnsavedChangesDialogOpen,
    requestClose,
    confirmClose,
  };
}
