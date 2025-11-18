type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export type FormState<T> = {
  status: "idle" | "success" | "error";
  fields: T;
  errors?: FieldErrors<T>;
};
