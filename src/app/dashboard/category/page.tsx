import { CreateCategoryDialog } from "@/components/CreateCategoryDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCategories } from "@/lib/dal/category";
import { formatDateForHuman } from "@/lib/utils/date";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="ml-10 w-2xl">
      <div className="flex flex-row-reverse my-10">
        <CreateCategoryDialog />
      </div>
      <Table>
        <TableCaption>A list of recipe categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={`${category._id}`}>
              <TableCell className="font-medium">{`${category._id}`}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{formatDateForHuman(category.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
