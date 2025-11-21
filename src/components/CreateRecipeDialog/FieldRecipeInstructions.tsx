import { useEffect, useId, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { InstructionInput } from "@/lib/validator/recipe";

interface Props {
  name: string;
  defaultValue: InstructionInput[];
  errors?: string[];
}

export const FieldRecipeInstructions = ({
  name,
  defaultValue,
  errors,
}: Props) => {
  const [instructions, setInstructions] =
    useState<InstructionInput[]>(defaultValue);
  const [textareaValue, setTextareaValue] = useState(
    defaultValue.map(({ text }) => text).join("\n"),
  );
  const id = useId();

  useEffect(() => {
    setInstructions(
      textareaValue
        .split("\n")
        .filter(Boolean)
        .map((text) => ({
          text,
        })),
    );
  }, [textareaValue]);

  useEffect(() => {
    setTextareaValue(defaultValue.map(({ text }) => text).join("\n"));
  }, [defaultValue]);

  return (
    <Field>
      <FieldLabel htmlFor={id}>Recipe Instructions</FieldLabel>
      <div className="flex flex-col gap-1">
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={JSON.stringify(instructions)} />

        {/* Textarea for instructions */}
        <Textarea
          id={id}
          placeholder="Type your recipe instructions, with each step on its own line"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />

        {/* Instruction list */}
        <ol className="list-decimal list-inside">
          {instructions.map((instruction, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: list order is meaningful and items aren't reordered
              key={index}
              className="text-muted-foreground p-0.5 odd:bg-gray-100 even:bg-white"
            >
              {instruction.text}
            </li>
          ))}
        </ol>
      </div>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
