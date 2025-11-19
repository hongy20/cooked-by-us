import type { HowToStep, Person, Recipe, WithContext } from "schema-dts";
import type { IRecipe } from "../lib/model/recipe";
import { formatDateForJsonLd } from "../lib/utils/date";

type Props = { recipe: IRecipe; authorName: string };

export const RecipeJsonLd = ({ recipe, authorName }: Props) => {
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
    recipeCuisine: recipe.cuisine,
    cookTime: recipe.cookTime,
    keywords: recipe.keywords.join(", "),
    recipeCategory: recipe.category,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map(
      (instruction) =>
        ({
          "@type": "HowToStep",
          text: instruction.text,
          image: instruction.image,
        }) satisfies HowToStep,
    ),
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
