import { CreateRecipe } from "@/components/CreateRecipe/CreateRecipe";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllRecipes } from "@/lib/dal/recipe";
import { formatDateForHuman } from "@/lib/utils/date";
import { isoToHuman } from "@/lib/utils/duration";

export default async function Page() {
  const recipes = await getAllRecipes();

  return (
    <div className="ml-10 w-3xl">
      <div className="flex flex-row-reverse my-10">
        <CreateRecipe />
      </div>
      <Table>
        <TableCaption>A list of recipe cuisines.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Cook time</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={`${recipe._id}`}>
              <TableCell className="font-medium">{`${recipe.author}`}</TableCell>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.category}</TableCell>
              <TableCell>{recipe.cuisine}</TableCell>
              <TableCell>{isoToHuman(recipe.cookTime)}</TableCell>
              <TableCell>{formatDateForHuman(recipe.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  // return (
  //   <div className="w-full flex flex-col items-center justify-center gap-4">
  //     <CreateRecipe />
  //   </div>
  // );
}
