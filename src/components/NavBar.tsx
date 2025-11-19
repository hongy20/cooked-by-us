"use client";

import { FilePenLine, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "@/lib/constant";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export const NavBar = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const signOutHandler = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      router.replace("/");
    }
  };

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="w-screen px-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {RECIPE_CATEGORY.map((category) => (
                  <NavigationMenuLink key={category} asChild>
                    <Link
                      href={`/search?category=${encodeURIComponent(category)}`}
                    >
                      {category}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Cuisine</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                {RECIPE_CUISINE.map((cuisine) => (
                  <NavigationMenuLink key={cuisine} asChild>
                    <Link
                      href={`/search?cuisine=${encodeURIComponent(cuisine)}`}
                    >
                      {cuisine}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {
          !isPending ? (
            session ? (
              <NavigationMenuItem className="ml-auto">
                <NavigationMenuTrigger>
                  <User />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="right-0 left-auto">
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/admin"
                          className="flex-row items-center gap-2"
                        >
                          <FilePenLine />
                          Admin
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="#"
                          className="flex-row items-center gap-2"
                          onClick={signOutHandler}
                        >
                          <LogOut />
                          Logout
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="ml-auto">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          ) : (
            <p />
          ) // Hide the UI when it's still loading
        }
      </NavigationMenuList>
    </NavigationMenu>
  );
};
