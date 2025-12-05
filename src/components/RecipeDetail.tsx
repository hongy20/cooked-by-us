import Image from "next/image";
import type { PersistedRecipe } from "@/lib/dal/types";
import { isoToHuman } from "@/lib/utils/duration";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

type Props = {
  recipe: PersistedRecipe | null;
};

export const RecipeDetail = ({ recipe }: Props) => {
  const isSkeleton = !recipe;

  return (
    <article className="max-w-4xl mx-auto p-2 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          {isSkeleton ? <Skeleton className="h-10" /> : recipe.name}
        </h1>

        <div className="flex flex-wrap gap-2">
          {isSkeleton ? (
            <>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </>
          ) : (
            <>
              {recipe.category && (
                <Badge variant="secondary">{recipe.category.name}</Badge>
              )}
              {recipe.cuisine && (
                <Badge variant="secondary">{recipe.cuisine.name}</Badge>
              )}
            </>
          )}
        </div>

        {isSkeleton ? (
          <Skeleton className="h-4 w-40" />
        ) : (
          <p className="text-sm text-muted-foreground">
            Created: {new Date(recipe.createdAt).toLocaleDateString()} |
            Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
          </p>
        )}
      </header>

      <figure className="relative w-full h-80 rounded-2xl overflow-hidden">
        {isSkeleton ? (
          <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        )}
      </figure>

      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        {isSkeleton ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <p className="text-muted-foreground">{recipe.description || "-"}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Cook Time</h2>
        {isSkeleton ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <p>{isoToHuman(recipe.cookTime)}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        {isSkeleton ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: best key there is
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        {isSkeleton ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: best key there is
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </ul>
        ) : (
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
      </section>

      <footer>
        <h2 className="text-xl font-semibold mb-2">Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {isSkeleton ? (
            <>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </>
          ) : (
            recipe.keywords.map((kw) => (
              <Badge key={kw} variant="outline">
                {kw}
              </Badge>
            ))
          )}
        </div>
      </footer>
    </article>
  );
};
