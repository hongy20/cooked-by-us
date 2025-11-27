import type { Category } from "@/lib/domain/category";
import type { Cuisine } from "@/lib/domain/cuisine";
import type { Recipe } from "@/lib/domain/recipe";

type Persisted<T> = T & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PersistedCategory = Persisted<Category>;
export type PersistedCuisine = Persisted<Cuisine>;

export type PersistedRecipe = Persisted<
  Omit<Recipe, "category" | "cuisine"> & {
    category: PersistedCategory | null;
    cuisine: PersistedCuisine | null;
  }
>;
