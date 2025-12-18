import { Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COOKED_BY_US } from "@/lib/constant";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="font-bold text-4xl sm:text-5xl">
          About <span className="font-extrabold">{COOKED_BY_US}</span>
        </h1>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Bringing home-tested recipes together into one organized collection.
        </p>
      </header>

      {/* Content */}
      <section className="prose sm:prose-lg mx-auto max-w-3xl">
        <p className="not-first:mt-6 leading-7">
          There's no shortage of recipes online — from blogs to YouTube channels
          — yet many are hard to replicate in an ordinary home kitchen. Missing
          ingredients, unclear instructions, or simply the difference between a
          professional setup and what a typical family actually has at home.
        </p>

        <p className="not-first:mt-6 leading-7">
          When a recipe works well in a regular home kitchen, it's useful to
          have a reliable place to store it — without digging through bookmarks
          or rewatching entire videos. Don't get me wrong, cooking videos are
          great for learning. It's just that they aren't always practical when
          you're standing by the stove, with smoking oil in the pan, and
          wondering what to do next.
        </p>

        <p className="not-first:mt-6 leading-7">
          <strong>{COOKED_BY_US}</strong> is a way to bring those scattered
          lessons together into one organized, personal recipe collection —
          real, tested, and ready to cook from.
        </p>

        <section className="mt-8 flex items-start gap-2">
          <Lock className="mt-1 h-5 w-5 text-muted-foreground" />
          <div>
            <h2 className="mb-2 font-semibold text-xl">Privacy Note</h2>
            <p className="text-muted-foreground leading-7">
              This website does not use cookies or any tracking technologies to
              identify visitors. There is no cookie consent banner because no
              personal data is stored or tracked.
            </p>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
