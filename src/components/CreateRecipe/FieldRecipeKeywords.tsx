import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface Props {
  name: string;
  defaultValue: string[];
  error: string[] | undefined;
}

const ID = "keywords";

export const FieldRecipeKeywords = ({ name, defaultValue, error }: Props) => {
  const [keywords, setKeywords] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const addKeyword = (keyword: string) => {
    const cleaned = keyword.trim();
    if (!cleaned) return;
    setKeywords((prev) => (prev.includes(cleaned) ? prev : [...prev, cleaned]));
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Keywords</FieldLabel>
      <div className="flex flex-col gap-2">
        {/* 🔒 Hidden input that integrates with native form */}
        <input type="hidden" name={name} value={JSON.stringify(keywords)} />

        {/* Editable input */}
        <Input
          id={ID}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addKeyword(inputValue);
              setInputValue("");
            }
          }}
          placeholder="Type a keyword and press Enter"
        />

        {/* Keywords */}
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <Badge
              key={keyword}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {keyword}
              <button
                type="button"
                className="rounded-sm hover:text-destructive"
                onClick={() => removeKeyword(keyword)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
};
