import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-background py-6 text-center text-sm text-muted-foreground">
      <p>
        Built by{" "}
        <Link
          href="https://github.com/hongy20"
          className="underline hover:text-primary"
        >
          hongy20
        </Link>{" "}
        at{" "}
        <Link
          href="https://vercel.com"
          className="underline hover:text-primary"
        >
          Vercel
        </Link>
        . The source code is available on{" "}
        <Link
          href="https://github.com/hongy20/cooked-by-us"
          className="underline hover:text-primary"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
};
