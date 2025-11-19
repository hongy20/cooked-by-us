import type { Metadata } from "next";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipesJsonLd } from "@/components/RecipesJsonLd";
import { getAllRecipesAction } from "@/lib/action/recipe";

export const metadata: Metadata = {
  title: "All Recipes - Discover Delicious Meals",
  description:
    "Browse our complete collection of recipes, from quick weeknight meals to gourmet dishes. Find step-by-step instructions, ingredients, and tips for every cuisine.",
};

export default async function Page() {
  const recipes = await getAllRecipesAction();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <RecipesJsonLd recipes={recipes} />
      <h1>All Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={`${recipe._id}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
