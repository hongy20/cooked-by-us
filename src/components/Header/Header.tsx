import Link from "next/link";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  // <header className="sticky top-0 z-20 py-2 bg-white dark:bg-gray-900">
  //   <NavBar />
  // </header>
  return (
    <header className="border-b bg-background mx-4">
      <div className="container flex h-16 items-center gap-1">
        <MobileNav />

        <Link href="/" className="text-xl font-bold">
          Cooked By Us
        </Link>

        <DesktopNav />
      </div>
    </header>
  );
};
