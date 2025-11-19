import { useId } from "react";
import { getSimilarRecipes } from "@/lib/dal/recipe";
import { RecipeCard } from "./RecipeCard";

type Props = { recipeId: string };
export const SimilarRecipes = async ({ recipeId }: Props) => {
  const id = useId();
  const similarRecipes = await getSimilarRecipes(recipeId);

  if (similarRecipes.length === 0) {
    return null;
  }

  return (
    <aside aria-labelledby={id}>
      <h2 id={id} className="mt-10">
        Similar Recipes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4 p-6">
        {similarRecipes.map((recipe) => (
          <RecipeCard key={`${recipe._id}`} recipe={recipe} />
        ))}
      </div>
    </aside>
  );
};
