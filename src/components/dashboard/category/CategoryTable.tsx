import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PersistedCategory } from "@/lib/dal/types";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { EditCategoryButton } from "./EditCategoryButton";

type Props = { categories: PersistedCategory[] };

export const CategoryTable = ({ categories }: Props) => {
  return (
    <Table className="rounded-xl border bg-card shadow-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Name</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No categories yet.
            </TableCell>
          </TableRow>
        )}

        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>

            <TableCell className="flex justify-end gap-3">
              <EditCategoryButton category={category} />

              <DeleteCategoryButton categoryId={category.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
