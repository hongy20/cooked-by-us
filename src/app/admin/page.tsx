import { redirect } from "next/navigation";
import { CreateRecipe } from "@/components/CreateRecipe";
import { getSession } from "@/lib/auth";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Admin page with {session.user.email}</h1>
      <CreateRecipe />
    </div>
  );
};

export default Page;
