import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Search",
  description:
    "The search functionality is coming soon once enough recipes are available. Explore all recipes on the home page in the meantime.",
  robots: {
    index: false, // prevent indexing
    follow: false, // prevent following links
  },
};

// type Props = PageProps<"/search">;

export default async function Page() {
  return (
    <main className="container mx-auto px-4 py-16 text-center sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="font-bold text-4xl sm:text-5xl">Search Coming Soon</h1>
      </header>

      <section className="prose sm:prose-lg mx-auto max-w-xl">
        <p>
          The search functionality will be implemented once there are enough
          recipes in the system to make it useful.
        </p>

        <p>
          In the meantime, feel free to explore all available recipes on the
          home page:
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/">Explore Recipes</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
