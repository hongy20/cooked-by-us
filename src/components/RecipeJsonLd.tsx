import type { HowToStep, Person, Recipe, WithContext } from "schema-dts";
import type { IPopulatedRecipe } from "@/lib/model";
import { formatDateForJsonLd } from "@/lib/utils/date";

type Props = { recipe: IPopulatedRecipe; authorName: string };

export const RecipeJsonLd = ({ recipe, authorName }: Props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
  }

  const jsonLd: WithContext<Recipe> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    image: recipe.image,
    author: {
      "@type": "Person",
      name: authorName,
    } satisfies Person,
    datePublished: formatDateForJsonLd(recipe.createdAt),
    description: recipe.description,
    recipeCuisine: recipe.cuisine?.name,
    cookTime: recipe.cookTime,
    keywords: recipe.keywords.join(", "),
    recipeCategory: recipe.category?.name,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map(
      (instruction) =>
        ({
          "@type": "HowToStep",
          text: instruction,
        }) satisfies HowToStep,
    ),
    url: `${BASE_URL}/recipe/${recipe._id}`,
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
