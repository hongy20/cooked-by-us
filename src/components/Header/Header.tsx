import Link from "next/link";
import { COOKED_BY_US } from "@/lib/constant";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { UserNav } from "./UserNav";

export const Header = () => {
  return (
    <header className="border-b bg-background mx-4">
      <div className="flex h-16 items-center gap-1">
        <MobileNav />

        <Link href="/" className="text-xl font-bold mr-4">
          {COOKED_BY_US}
        </Link>

        <DesktopNav />

        <div className="grow" />

        <UserNav />
      </div>
    </header>
  );
};
