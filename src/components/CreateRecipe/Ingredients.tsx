import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  name?: string;
  defaultValue?: string[];
}

export function Ingredients({ name, defaultValue = [] }: Props) {
  const [ingredients, setIngredients] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = (ingredient: string) => {
    const cleaned = ingredient.trim();
    if (!cleaned) return;
    if (ingredients.includes(cleaned)) return;
    setIngredients([...ingredients, cleaned]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Hidden input for form submission */}
      {name && (
        <input type="hidden" name={name} value={JSON.stringify(ingredients)} />
      )}

      {/* Input for new ingredient */}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addIngredient(inputValue);
            setInputValue("");
          }
        }}
        placeholder="Type an ingredient and press Enter"
      />

      {/* Ingredient list */}
      <ul className="list-disc list-inside">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient}
            className="flex items-center text-muted-foreground justify-between gap-2 bg-background px-2 rounded-md"
          >
            {ingredient}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeIngredient(ingredient)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
