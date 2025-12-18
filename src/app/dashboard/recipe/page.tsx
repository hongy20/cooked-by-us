import { AddRecipeButton } from "@/components/dashboard/recipe/AddRecipeButton";
import { RecipeTable } from "@/components/dashboard/recipe/RecipeTable";
import { getAllRecipes } from "@/lib/dal/recipe";

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Recipes</h1>
        <AddRecipeButton />
      </div>

      <RecipeTable recipes={recipes} />
    </div>
  );
}
