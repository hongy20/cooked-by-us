import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RecipeDetail } from "@/components/RecipeDetail";
import { RecipeJsonLd } from "@/components/RecipeJsonLd";
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
    <>
      <RecipeJsonLd recipe={recipe} />
      <RecipeDetail recipe={recipe} />
      <SimilarRecipes recipeId={recipeId} />
    </>
  );
};

export default async function Page({ params }: Props) {
  const recipeIdPromise = params.then(({ id }) => id);

  return (
    <main className="my-10 mx-4 md:mx-16 lg:mx-24">
      <Suspense fallback={<RecipeDetail recipe={null} />}>
        <PageContent recipeIdPromise={recipeIdPromise} />
      </Suspense>
    </main>
  );
}
