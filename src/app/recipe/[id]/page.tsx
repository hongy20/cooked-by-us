import { notFound } from "next/navigation";
import { RecipeView } from "@/components/RecipeView";
import { SimilarRecipes } from "@/components/SimilarRecipes";
import { getRecipe } from "@/lib/dal/recipe";

export default async function Page({ params }: PageProps<"/recipe/[id]">) {
  const recipeId = await params.then(({ id }) => id);
  const recipe = await getRecipe(recipeId).catch(console.error);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-12 md:mx-24 lg:mx-36">
      <RecipeView recipe={recipe} authorName="" />
      <SimilarRecipes recipeId={recipeId} />
    </div>
  );
}
