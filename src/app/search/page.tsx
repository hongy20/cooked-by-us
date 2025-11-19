export default async function Page({ searchParams }: PageProps<"/search">) {
  const query = await searchParams;

  return (
    <div>
      <h1 className="my-6">Search</h1>
      <p>q: {query.q}</p>
      <p>category: {query.category}</p>
      <p>cuisine: {query.cuisine}</p>
    </div>
  );
}
