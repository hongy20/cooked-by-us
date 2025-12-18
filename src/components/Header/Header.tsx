import Link from "next/link";
import { COOKED_BY_US } from "@/lib/constant";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { UserNav } from "./UserNav";

export const Header = () => {
  return (
    <header className="mx-4 border-b bg-background">
      <div className="flex h-16 items-center gap-1">
        <MobileNav />

        <Link href="/" className="mr-4 font-bold text-xl">
          {COOKED_BY_US}
        </Link>

        <DesktopNav />

        <div className="grow" />

        <UserNav />
      </div>
    </header>
  );
};
