import { useState } from "react";
import {
  isoToMinutes,
  minutesToHuman,
  minutesToISO,
} from "@/lib/utils/duration";
import { FieldDescription } from "../ui/field";
import { Slider } from "../ui/slider";

interface Props {
  name: string;
  defaultValue: string;
}

export function CookTime({ name, defaultValue }: Props) {
  const [cookTimeInMinutes, setCookTimeInMinutes] = useState(
    isoToMinutes(defaultValue),
  );

  return (
    <div className="flex flex-col gap-2">
      {/* 🔒 Hidden input that integrates with native form */}
      <input
        type="hidden"
        name={name}
        value={minutesToISO(cookTimeInMinutes)}
      />

      <Slider
        value={[cookTimeInMinutes]}
        onValueChange={(value) => setCookTimeInMinutes(value[0])}
        max={600}
        min={10}
        step={10}
      />
      <FieldDescription>{minutesToHuman(cookTimeInMinutes)}</FieldDescription>
    </div>
  );
}
