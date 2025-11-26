import type { HowToStep, Organization, Recipe } from "schema-dts";
import type { PersistedRecipe } from "@/lib/dal/types";
import { formatDateForJsonLd } from "@/lib/utils/date";
import { COOKED_BY_US } from "../constant";

export const getRecipeJsonLd = (recipe: PersistedRecipe): Recipe => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
  }

  return {
    "@type": "Recipe",
    name: recipe.name,
    image: recipe.image,
    author: {
      "@type": "Organization",
      name: COOKED_BY_US,
      url: BASE_URL,
    } satisfies Organization,
    datePublished: formatDateForJsonLd(recipe.createdAt),
    description: recipe.description,
    recipeCuisine: recipe.cuisine?.name,
    cookTime: recipe.cookTime,
    keywords: recipe.keywords.join(", "),
    recipeCategory: recipe.category?.name,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map(
      (instruction) =>
        ({
          "@type": "HowToStep",
          text: instruction,
        }) satisfies HowToStep,
    ),
    url: `${BASE_URL}/recipe/${recipe.id}`,
  };
};
