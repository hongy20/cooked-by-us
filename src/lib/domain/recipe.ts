import type { Category } from "./category";
import type { Cuisine } from "./cuisine";

// Represent the business meaning of a Recipe
export interface Recipe {
  name: string;
  description: string;
  image: string;
  category: Category | null;
  cuisine: Cuisine | null;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  keywords: string[];
}
