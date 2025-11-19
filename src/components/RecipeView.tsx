import Image from "next/image";
import type { IRecipe } from "@/lib/model/recipe";
import { isoToHuman } from "@/lib/utils/duration";

type Props = {
  recipe: IRecipe;
  authorName: string; // resolved from author id
};

export const RecipeView = ({
  recipe: {
    name,
    description,
    image,
    category,
    cuisine,
    ingredients,
    instructions,
    cookTime,
    keywords,
    createdAt,
    updatedAt,
  },
  authorName,
}: Props) => {
  return (
    <article className="flex flex-col space-y-8">
      <header className="flex flex-col space-y-6">
        <h1>{name}</h1>

        <p className="text-muted-foreground text-base">{description}</p>

        <figure className="relative aspect-3/2 w-full">
          <Image src={image} alt={`Photo of ${name}`} fill />
        </figure>

        <p className="text-sm">
          By <span>{authorName}</span> Published{" "}
          <time dateTime={new Date(createdAt).toISOString()}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </p>

        <p>
          <span>Category: {category}</span> · <span>Cuisine: {cuisine}</span> ·{" "}
          <span>Cook Time: {isoToHuman(cookTime)}</span>
        </p>
      </header>

      <section>
        <h2>Ingredients</h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Instructions</h2>
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
          {instructions.map((instruction, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: list order is meaningful and items aren't reordered
            <li key={i}>
              <p>{instruction.text}</p>
              {instruction.image && (
                <Image src={instruction.image} alt={`Step ${i + 1}`} />
              )}
            </li>
          ))}
        </ol>
      </section>

      <footer>
        <p>
          <strong>Keywords:</strong>{" "}
          {keywords.map((k, i) => (
            <span key={k}>
              {k}
              {i < keywords.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p className="text-muted-foreground text-sm">
          Updated{" "}
          <time dateTime={new Date(updatedAt).toISOString()}>
            {new Date(updatedAt).toLocaleDateString()}
          </time>
        </p>
      </footer>
    </article>
  );
};
