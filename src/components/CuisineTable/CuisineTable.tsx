import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ICuisine } from "@/lib/model";
import { DeleteCuisineButton } from "./DeleteCuisineButton";
import { EditCuisineSheet } from "./EditCuisineSheet";

type Props = { cuisines: ICuisine[] };

export const CuisineTable = ({ cuisines }: Props) => {
  return (
    <Table className="rounded-xl border bg-card shadow-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Name</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cuisines.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              No cuisines yet.
            </TableCell>
          </TableRow>
        )}

        {cuisines.map((cuisine) => (
          <TableRow key={`${cuisine._id}`}>
            <TableCell>{cuisine.name}</TableCell>

            <TableCell className="flex justify-end gap-3">
              <EditCuisineSheet cuisine={cuisine} />

              <DeleteCuisineButton cuisineId={`${cuisine._id}`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
