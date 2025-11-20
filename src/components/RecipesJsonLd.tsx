import type { ItemList, Recipe, WithContext } from "schema-dts";
import type { IRecipe } from "@/lib/model/recipe";

type Props = { recipes: IRecipe[] };

export const RecipesJsonLd = ({ recipes }: Props) => {
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
    //  Add JSON-LD to your page
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: insert JSON-LD
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
};
