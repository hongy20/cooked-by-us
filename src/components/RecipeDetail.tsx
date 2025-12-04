import Image from "next/image";
import type { PersistedRecipe } from "@/lib/dal/types";
import { isoToHuman } from "@/lib/utils/duration";
import { Badge } from "./ui/badge";

type Props = {
  recipe: PersistedRecipe;
};

export const RecipeDetail = ({ recipe }: Props) => {
  return (
    <article className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{recipe.name}</h1>

        <div className="flex flex-wrap gap-2">
          {recipe.category && (
            <Badge variant="secondary">{recipe.category.name}</Badge>
          )}
          {recipe.cuisine && (
            <Badge variant="secondary">{recipe.cuisine.name}</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Created: {new Date(recipe.createdAt).toLocaleDateString()} | Updated:{" "}
          {new Date(recipe.updatedAt).toLocaleDateString()}
        </p>
      </header>

      <figure className="relative w-full h-80 rounded-2xl overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
        />
      </figure>

      {recipe.description && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{recipe.description}</p>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Cook Time</h2>
        <p>{isoToHuman(recipe.cookTime)}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <footer>
        <h2 className="text-xl font-semibold mb-2">Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.keywords.map((kw) => (
            <Badge key={kw} variant="outline">
              {kw}
            </Badge>
          ))}
        </div>
      </footer>
    </article>
  );
};
