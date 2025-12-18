import { AddCuisineButton } from "@/components/dashboard/cuisine/AddCuisineButton";
import { CuisineTable } from "@/components/dashboard/cuisine/CuisineTable";
import { getAllCuisines } from "@/lib/dal/cuisine";

export default async function Page() {
  const cuisines = await getAllCuisines();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Cuisines</h1>
        <AddCuisineButton />
      </div>

      <CuisineTable cuisines={cuisines} />
    </div>
  );
}
