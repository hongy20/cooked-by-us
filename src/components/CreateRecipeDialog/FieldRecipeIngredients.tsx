import { useEffect, useId, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  name: string;
  defaultValue: string[];
  errors?: string[];
}

export const FieldRecipeIngredients = ({
  name,
  defaultValue,
  errors,
}: Props) => {
  const [ingredients, setIngredients] = useState<string[]>(defaultValue);
  const [textareaValue, setTextareaValue] = useState(defaultValue.join("\n"));
  const id = useId();

  useEffect(() => {
    setIngredients(textareaValue.split("\n").filter(Boolean));
  }, [textareaValue]);

  useEffect(() => {
    setTextareaValue(defaultValue.join("\n"));
  }, [defaultValue]);

  return (
    <Field>
      <FieldLabel htmlFor={id}>Recipe Ingredients</FieldLabel>
      <div className="flex flex-col gap-1">
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={JSON.stringify(ingredients)} />

        {/* Textarea for ingredients */}
        <Textarea
          id={id}
          placeholder="Type your recipe ingredients"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />

        {/* Ingredient list */}
        <ul className="list-disc list-inside">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="text-muted-foreground p-0.5 odd:bg-gray-100 even:bg-white"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
