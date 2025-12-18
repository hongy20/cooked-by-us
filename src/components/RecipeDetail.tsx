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
    <article className="mx-auto max-w-4xl space-y-6 p-2">
      <header className="space-y-2">
        <h1 className="font-bold text-3xl">
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
          <p className="text-muted-foreground text-sm">
            Created: {new Date(recipe.createdAt).toLocaleDateString()} |
            Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
          </p>
        )}
      </header>

      <figure className="relative h-80 w-full overflow-hidden rounded-2xl">
        {isSkeleton ? (
          <Skeleton className="absolute inset-0 h-full w-full" />
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
        <h2 className="mb-2 font-semibold text-xl">Description</h2>
        {isSkeleton ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <p className="text-muted-foreground">{recipe.description || "-"}</p>
        )}
      </section>

      <section>
        <h2 className="mb-2 font-semibold text-xl">Cook Time</h2>
        {isSkeleton ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <p>{isoToHuman(recipe.cookTime)}</p>
        )}
      </section>

      <section>
        <h2 className="mb-2 font-semibold text-xl">Ingredients</h2>
        {isSkeleton ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: best key there is
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </ul>
        ) : (
          <ul className="list-inside list-disc space-y-1">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-2 font-semibold text-xl">Instructions</h2>
        {isSkeleton ? (
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: best key there is
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </ul>
        ) : (
          <ol className="list-inside list-decimal space-y-2">
            {recipe.instructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
      </section>

      <footer>
        <h2 className="mb-2 font-semibold text-xl">Keywords</h2>
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
