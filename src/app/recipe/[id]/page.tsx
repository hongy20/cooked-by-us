import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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

const PageContent = async ({
  recipeIdPromise,
}: {
  recipeIdPromise: Promise<string>;
}) => {
  const recipeId = await recipeIdPromise;
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="my-10 mx-12 md:mx-24 lg:mx-36">
      <RecipeJsonLd recipe={recipe} />
      <RecipeView recipe={recipe} />
      <SimilarRecipes recipeId={recipeId} />
    </main>
  );
};

export default async function Page({ params }: Props) {
  const recipeIdPromise = params.then(({ id }) => id);

  return (
    <Suspense>
      <PageContent recipeIdPromise={recipeIdPromise} />
    </Suspense>
  );
}
