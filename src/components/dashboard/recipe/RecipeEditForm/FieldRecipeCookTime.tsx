import { useId, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import {
  isoToMinutes,
  minutesToHuman,
  minutesToISO,
} from "@/lib/utils/duration";

interface Props {
  name: string;
  defaultValue: string;
  errors?: string[];
}

const MIN_MINUTES = 10;
const MAX_MINUTES = 600;
const DEFAULT_MINUTES = 30;

export const FieldRecipeCookTime = ({ name, defaultValue, errors }: Props) => {
  const id = useId();
  const [cookTimeInMinutes, setCookTimeInMinutes] = useState(() => {
    if (!defaultValue) return DEFAULT_MINUTES;
    try {
      const minutes = isoToMinutes(defaultValue);
      if (!Number.isFinite(minutes) || minutes <= 0) return DEFAULT_MINUTES;
      return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, minutes));
    } catch {
      return DEFAULT_MINUTES; // Fallback on parse error
    }
  });

  return (
    <Field>
      <FieldLabel htmlFor={id}>Cook Time</FieldLabel>
      <div className="flex flex-col gap-2">
        {/* 🔒 Hidden input that integrates with native form */}
        <input
          type="hidden"
          name={name}
          value={minutesToISO(cookTimeInMinutes)}
        />

        <Slider
          id={id}
          value={[cookTimeInMinutes]}
          onValueChange={(value) => {
            if (value.length > 0) setCookTimeInMinutes(value[0]);
          }}
          max={MAX_MINUTES}
          min={MIN_MINUTES}
          step={10}
        />
        <FieldDescription>{minutesToHuman(cookTimeInMinutes)}</FieldDescription>
      </div>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
