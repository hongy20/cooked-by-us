import type { Metadata } from "next";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipesJsonLd } from "@/components/RecipesJsonLd";
import { getAllRecipes } from "@/lib/dal/recipe";

export const metadata: Metadata = {
  title: "Discover Delicious Meals | Cooked by Us",
};

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <RecipesJsonLd recipes={recipes} />
      <h1>All Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
