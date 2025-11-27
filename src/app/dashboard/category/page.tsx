import { AddCategoryButton } from "@/components/dashboard/category/AddCategoryButton";
import { CategoryTable } from "@/components/dashboard/category/CategoryTable";
import { getAllCategories } from "@/lib/dal/category";

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <AddCategoryButton />
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
