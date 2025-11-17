import { useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface Props {
  name: string;
  defaultValue: string[];
  error: string[] | undefined;
}

const ID = "ingredients";

export const FieldRecipeIngredients = ({
  name,
  defaultValue,
  error,
}: Props) => {
  const [ingredients, setIngredients] = useState<string[]>(defaultValue);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    setIngredients(textareaValue.split("\n").filter(Boolean));
  }, [textareaValue]);

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Recipe Ingredients</FieldLabel>
      <div className="flex flex-col gap-1">
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={JSON.stringify(ingredients)} />

        {/* Textarea for ingredients */}
        <Textarea
          id={ID}
          placeholder="Type your recipe ingredients"
          onChange={(e) => setTextareaValue(e.target.value)}
          defaultValue={textareaValue}
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
      <FieldError>{error}</FieldError>
    </Field>
  );
};
