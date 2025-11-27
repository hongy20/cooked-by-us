import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { getAllCuisinesAction } from "@/lib/action/cuisine";
import type { PersistedCuisine } from "@/lib/dal/types";

interface Props {
  name: string;
  defaultValue: string | undefined;
  errors?: string[];
}

export const FieldRecipeCuisine = ({ name, defaultValue, errors }: Props) => {
  const [cuisines, setCuisines] = useState<PersistedCuisine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cuisine, setCuisine] = useState<string | undefined>(defaultValue);
  const id = useId();

  useEffect(() => {
    setIsLoading(true);
    getAllCuisinesAction()
      .then(setCuisines)
      .catch(() => toast.error("Unable to load cuisines"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Field>
      <FieldLabel htmlFor={id}>
        Recipe Cuisine
        {isLoading && <Spinner />}
      </FieldLabel>

      {/* Prevent form from losing the selected value */}
      <input type="hidden" name={name} value={cuisine ?? ""} />

      <Select value={cuisine} onValueChange={setCuisine}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Choose cuisine" />
        </SelectTrigger>
        <SelectContent>
          {cuisines.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
};
