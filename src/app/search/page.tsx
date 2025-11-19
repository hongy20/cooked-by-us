export default async function Page({ searchParams }: PageProps<"/search">) {
  const sp = await searchParams;

  return (
    <div>
      <h1 className="my-6">Search</h1>
      <p>queqy: {sp.queqy}</p>
      <p>category: {sp.category}</p>
      <p>cuisine: {sp.cuisine}</p>
    </div>
  );
}
