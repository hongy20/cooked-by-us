import Image from "next/image";
import Link from "next/link";
import type { PersistedRecipe } from "@/lib/dal/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const RecipeCard = ({ recipe }: { recipe: PersistedRecipe }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription className="line-clamp-6 leading-5 h-[calc(1.25rem*6)]">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative aspect-3/2 w-full">
        <Image
          src={recipe.image}
          alt={`Photo of ${recipe.name}`}
          fill
          className="object-cover"
        />
      </CardContent>
      <CardFooter>
        <Link href={`/recipe/${recipe.id}`}>Open</Link>
      </CardFooter>
    </Card>
  );
};
