import { useEffect, useState } from "react";
import type { InstructionInput } from "@/lib/validator/recipe";
import { Textarea } from "../ui/textarea";

interface Props {
  name?: string;
  defaultValue?: InstructionInput[];
}

export function Instructions({ name, defaultValue = [] }: Props) {
  const [instructions, setInstructions] =
    useState<InstructionInput[]>(defaultValue);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    setInstructions(
      textareaValue
        .split("\n")
        .filter(Boolean)
        .map((step) => ({
          text: step,
        })),
    );
  }, [textareaValue]);

  return (
    <div className="flex flex-col gap-1">
      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} value={JSON.stringify(instructions)} />
      )}

      {/* Textarea for instructions */}
      <Textarea
        placeholder="Type your recipe instructions, with each step on its own line"
        onChange={(e) => setTextareaValue(e.target.value)}
      />

      {/* Instruction list */}
      <ol className="list-decimal list-inside">
        {instructions.map((instruction) => (
          <li
            key={instruction.text}
            className="text-muted-foreground p-0.5 odd:bg-gray-100 even:bg-white"
          >
            {instruction.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
