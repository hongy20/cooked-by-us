import { getSession } from "@/lib/auth";

const Page = async () => {
  const session = await getSession();
  return <p>Admin page with {session?.user.email}</p>;
};

export default Page;
