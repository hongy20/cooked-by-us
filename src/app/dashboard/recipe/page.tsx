import { AddRecipeButton } from "@/components/RecipeTable/AddRecipeButton";
import { RecipeTable } from "@/components/RecipeTable/RecipeTable";
import { getAllRecipes } from "@/lib/dal/recipe";

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Recipes</h1>
        <AddRecipeButton />
      </div>

      <RecipeTable recipes={recipes} />
    </div>
  );
}
