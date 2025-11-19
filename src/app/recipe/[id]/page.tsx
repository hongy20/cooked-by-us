import { notFound } from "next/navigation";
import { RecipeView } from "@/components/RecipeView";
import { getRecipe } from "@/lib/dal/recipe";

export default async function Page({ params }: PageProps<"/recipe/[id]">) {
  const recipeId = await params.then(({ id }) => id);
  const recipe = await getRecipe(recipeId).catch(console.error);

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <RecipeView
        name={recipe.name}
        description={recipe.description}
        image={recipe.image}
        authorName=""
        category={recipe.category}
        cuisine={recipe.cuisine}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
        cookTime={recipe.cookTime}
        keywords={recipe.keywords}
        createdAt={recipe.createdAt}
        updatedAt={recipe.updatedAt}
      />
    </div>
  );
}
