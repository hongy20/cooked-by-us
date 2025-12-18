import type { Metadata } from "next";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipesJsonLd } from "@/components/RecipesJsonLd";
import { COOKED_BY_US } from "@/lib/constant";
import { getAllRecipes } from "@/lib/dal/recipe";

export const metadata: Metadata = {
  title: `Discover Delicious Meals | ${COOKED_BY_US}`,
};

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <main className="my-10 flex flex-col items-center gap-4">
      <RecipesJsonLd recipes={recipes} />
      <h1>All Recipes</h1>
      <div className="grid w-full grid-cols-1 justify-center gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
