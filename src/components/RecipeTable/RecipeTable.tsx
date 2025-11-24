import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IPopulatedRecipe } from "@/lib/model";
import { DeleteRecipeButton } from "./DeleteRecipeButton";
import { EditRecipeSheet } from "./EditRecipeSheet";

type Props = { recipes: IPopulatedRecipe[] };

export const RecipeTable = ({ recipes }: Props) => {
  return (
    <Table className="rounded-xl border bg-card shadow-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Title</TableHead>
          <TableHead className="w-32">Category</TableHead>
          <TableHead className="w-32">Cuisine</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {recipes.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No recipes yet.
            </TableCell>
          </TableRow>
        )}

        {recipes.map((recipe) => (
          <TableRow key={`${recipe._id}`}>
            <TableCell>{recipe.name}</TableCell>
            <TableCell>{recipe.category?.name ?? "—"}</TableCell>
            <TableCell>{recipe.cuisine?.name ?? "—"}</TableCell>

            <TableCell className="flex justify-end gap-3">
              <EditRecipeSheet recipe={recipe} />

              <DeleteRecipeButton recipeId={`${recipe._id}`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
