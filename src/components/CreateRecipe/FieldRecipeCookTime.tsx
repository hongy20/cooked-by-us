import { useState } from "react";
import {
  isoToMinutes,
  minutesToHuman,
  minutesToISO,
} from "@/lib/utils/duration";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

interface Props {
  name: string;
  defaultValue: string;
  error: string[] | undefined;
}

const ID = "cookTime";

export const FieldRecipeCookTime = ({ name, defaultValue, error }: Props) => {
  const [cookTimeInMinutes, setCookTimeInMinutes] = useState(() => {
    try {
      return isoToMinutes(defaultValue);
    } catch {
      return 30; // Default to 30 minutes on parse error
    }
  });

  return (
    <Field>
      <FieldLabel htmlFor={ID}>Cook Time</FieldLabel>
      <div className="flex flex-col gap-2">
        {/* 🔒 Hidden input that integrates with native form */}
        <input
          type="hidden"
          name={name}
          value={minutesToISO(cookTimeInMinutes)}
        />

        <Slider
          id={ID}
          value={[cookTimeInMinutes]}
          onValueChange={(value) => {
            if (value.length > 0) setCookTimeInMinutes(value[0]);
          }}
          max={600}
          min={10}
          step={10}
        />
        <FieldDescription>{minutesToHuman(cookTimeInMinutes)}</FieldDescription>
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
};
