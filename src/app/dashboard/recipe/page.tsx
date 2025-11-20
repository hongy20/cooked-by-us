import { CreateRecipe } from "@/components/CreateRecipe/CreateRecipe";

const Page = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <CreateRecipe />
    </div>
  );
};

export default Page;
