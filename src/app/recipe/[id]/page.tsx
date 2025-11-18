import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/dal/recipe";

export default async function Page({ params }: PageProps<"/recipe/[id]">) {
  const recipeId = await params.then(({ id }) => id);
  const recipe = await getRecipe(recipeId).catch(console.error);

  if (!recipe) {
    notFound();
  }

  return <p>{recipe.name}</p>;
}
