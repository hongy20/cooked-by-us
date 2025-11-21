import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Recipes */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-80">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/recipes"
                      className="block rounded p-2 hover:bg-accent"
                    >
                      All Recipes
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/categories"
                      className="block rounded p-2 hover:bg-accent"
                    >
                      Categories
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Static link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/about"
                className="px-4 py-2 hover:text-primary transition-colors"
              >
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
