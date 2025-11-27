import type { Recipe, WithContext } from "schema-dts";
import type { PersistedRecipe } from "@/lib/dal/types";
import { getRecipeJsonLd } from "@/lib/utils/json-ld";

type Props = { recipe: PersistedRecipe };

export const RecipeJsonLd = ({ recipe }: Props) => {
  const jsonLd: WithContext<Recipe> = {
    "@context": "https://schema.org",
    ...getRecipeJsonLd(recipe),
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
