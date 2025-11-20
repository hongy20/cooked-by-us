"use client";

import { useActionState, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type CreateCategoryFormState,
  createCategoryAction,
} from "@/lib/action/category";
import { FieldError } from "./ui/field";
import { Spinner } from "./ui/spinner";

const initialState: CreateCategoryFormState = {
  status: "idle",
  fields: {
    name: "",
  },
};

export const CreateCategoryDialog = () => {
  const id = useId();
  const [state, action, pending] = useActionState(
    createCategoryAction,
    initialState,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>
            Create new category your app here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4 mb-6">
            <Label htmlFor={id}>Category Name</Label>
            <Input
              id={id}
              name="name"
              autoComplete="off"
              defaultValue={state.fields.name}
              data-1p-ignore
            />
            <FieldError
              errors={
                state.message
                  ? [{ message: state.message }]
                  : state.errors?.name?.map((message) => ({ message }))
              }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="w-30 relative" disabled={pending}>
              {pending && <Spinner className="absolute left-3" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
