import type { Metadata } from "next";
import type { ItemList, Recipe, WithContext } from "schema-dts";
import { RecipeCard } from "@/components/RecipeCard";
import { getAllRecipesAction } from "@/lib/action/recipe";

export const metadata: Metadata = {
  title: "All Recipes - Discover Delicious Meals",
  description:
    "Browse our complete collection of recipes, from quick weeknight meals to gourmet dishes. Find step-by-step instructions, ingredients, and tips for every cuisine.",
};

export default async function Page() {
  const recipes = await getAllRecipesAction();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
  }

  const jsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: recipes.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Recipe",
        name: recipe.name,
        image: recipe.image,
        recipeCuisine: recipe.cuisine,
        recipeCategory: recipe.category,
        keywords: recipe.keywords.join(", "),
        url: `${BASE_URL}/recipe/${recipe._id}`,
      } satisfies Recipe,
    })),
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: insert JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        All Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={`${recipe._id}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
