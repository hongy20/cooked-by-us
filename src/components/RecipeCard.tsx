import Image from "next/image";
import Link from "next/link";
import type { PersistedRecipe } from "@/lib/dal/types";
import { isoToHuman } from "@/lib/utils/duration";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const RecipeCard = ({ recipe }: { recipe: PersistedRecipe }) => {
  const badges = [recipe.category?.name, recipe.cuisine?.name].filter(Boolean);

  return (
    <Link href={`/recipe/${recipe.id}`} className="block group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg rounded-2xl">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-lg line-clamp-1">{recipe.name}</CardTitle>
          {/* Category + Cuisine */}
          {badges.length > 0 && (
            <div className="flex gap-2 mt-1">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="text-muted-foreground"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-2">
            {recipe.description}
          </CardDescription>

          <p className="mt-3 text-xs text-muted-foreground">
            ⏱ {isoToHuman(recipe.cookTime)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
