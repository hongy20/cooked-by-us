import { AddCuisineButton } from "@/components/CuisineTable/AddCuisineButton";
import { CuisineTable } from "@/components/CuisineTable/CuisineTable";
import { getAllCuisines } from "@/lib/dal/cuisine";

export default async function Page() {
  const cuisines = await getAllCuisines();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Cuisines</h1>
        <AddCuisineButton />
      </div>

      <CuisineTable cuisines={cuisines} />
    </div>
  );
}
