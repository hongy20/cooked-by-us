import { getSession } from "@/lib/auth";

const Page = async () => {
  const session = await getSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Admin page with {session?.user.email}</h1>
    </div>
  );
};

export default Page;
