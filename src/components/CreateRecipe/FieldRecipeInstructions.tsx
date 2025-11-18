import { useEffect, useState } from "react";
import type { InstructionInput } from "@/lib/validator/recipe";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface Props {
  name: string;
  defaultValue: InstructionInput[];
  error: string[] | undefined;
}

const ID = "instructions";

export const FieldRecipeInstructions = ({
  name,
  defaultValue,
  error,
}: Props) => {
  const [instructions, setInstructions] =
    useState<InstructionInput[]>(defaultValue);
  const [textareaValue, setTextareaValue] = useState(
    defaultValue.map(({ text }) => text).join("\n"),
  );

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
      <FieldLabel htmlFor={ID}>Recipe Instructions</FieldLabel>
      <div className="flex flex-col gap-1">
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={JSON.stringify(instructions)} />

        {/* Textarea for instructions */}
        <Textarea
          id={ID}
          placeholder="Type your recipe instructions, with each step on its own line"
          onChange={(e) => setTextareaValue(e.target.value)}
          defaultValue={textareaValue}
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
      <FieldError>{error}</FieldError>
    </Field>
  );
};
