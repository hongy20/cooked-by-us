import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  defaultValue?: string[];
}

export function Keywords({ name, defaultValue = [] }: Props) {
  const [keywords, setKeywords] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const addKeyword = (keyword: string) => {
    const cleaned = keyword.trim();
    if (!cleaned) return;
    if (keywords.includes(cleaned)) return;
    setKeywords([...keywords, cleaned]);
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 🔒 Hidden input that integrates with native form */}
      <input type="hidden" name={name} value={JSON.stringify(keywords)} />

      {/* Editable input */}
      <Input
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
  );
}
