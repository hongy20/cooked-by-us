import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipesAction } from "@/lib/action/recipe";

export default async function Page() {
  const recipes = await getAllRecipesAction();
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        All Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4 m-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id as string} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
