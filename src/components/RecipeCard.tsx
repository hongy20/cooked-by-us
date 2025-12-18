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
    <Link href={`/recipe/${recipe.id}`} className="group block">
      <Card className="overflow-hidden rounded-2xl transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg">{recipe.name}</CardTitle>
          {/* Category + Cuisine */}
          {badges.length > 0 && (
            <div className="mt-1 flex gap-2">
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
          {recipe.description && (
            <CardDescription className="line-clamp-2">
              {recipe.description}
            </CardDescription>
          )}

          <p className="mt-3 text-muted-foreground text-xs">
            ⏱ {isoToHuman(recipe.cookTime)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
