import type { ItemList, WithContext } from "schema-dts";
import type { PersistedRecipe } from "@/lib/dal/types";
import { getRecipeJsonLd } from "@/lib/utils/json-ld";

type Props = { recipes: PersistedRecipe[] };

export const RecipesJsonLd = ({ recipes }: Props) => {
  const jsonLd: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: recipes.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: getRecipeJsonLd(recipe),
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
