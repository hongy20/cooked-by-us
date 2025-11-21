import { CreateCuisineDialog } from "@/components/CreateCuisineDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCuisines } from "@/lib/dal/cuisine";
import { formatDateForHuman } from "@/lib/utils/date";

export default async function Page() {
  const cuisines = await getAllCuisines();

  return (
    <div className="ml-10 w-2xl">
      <div className="flex flex-row-reverse my-10">
        <CreateCuisineDialog />
      </div>
      <Table>
        <TableCaption>A list of recipe cuisines.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cuisines.map((cuisine) => (
            <TableRow key={`${cuisine._id}`}>
              <TableCell>{cuisine.name}</TableCell>
              <TableCell>{formatDateForHuman(cuisine.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
