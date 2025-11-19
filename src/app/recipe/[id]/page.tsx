import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeJsonLd } from "@/components/RecipeJsonLd";
import { RecipeView } from "@/components/RecipeView";
import { SimilarRecipes } from "@/components/SimilarRecipes";
import { getRecipe } from "@/lib/dal/recipe";

type Props = PageProps<"/recipe/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipeId = await params.then(({ id }) => id);
  const recipe = await getRecipe(recipeId).catch(console.error);

  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name,
    description: recipe.description,
    openGraph: {
      images: recipe.image,
    },
  };
}

export default async function Page({ params }: Props) {
  const recipeId = await params.then(({ id }) => id);
  const recipe = await getRecipe(recipeId).catch(console.error);
  const authorName = "TBD";

  if (!recipe) {
    notFound();
  }

  return (
    <div className="my-10 mx-12 md:mx-24 lg:mx-36">
      <RecipeJsonLd recipe={recipe} authorName={authorName} />
      <RecipeView recipe={recipe} authorName={authorName} />
      <SimilarRecipes recipeId={recipeId} />
    </div>
  );
}
