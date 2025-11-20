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
  type CreateCuisineFormState,
  createCuisineAction,
} from "@/lib/action/cuisine";
import { FieldError } from "./ui/field";
import { Spinner } from "./ui/spinner";

const initialState: CreateCuisineFormState = {
  status: "idle",
  fields: {
    name: "",
  },
};

export const CreateCuisineDialog = () => {
  const id = useId();
  const [state, action, pending] = useActionState(
    createCuisineAction,
    initialState,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Cuisine</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create new cuisine</DialogTitle>
          <DialogDescription>
            Create new cursine to your app here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4 mb-6">
            <Label htmlFor={id}>Cuisine Name</Label>
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
