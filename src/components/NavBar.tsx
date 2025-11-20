"use client";

import { FilePenLine, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "@/lib/constant";
import { Button } from "./ui/button";
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

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      router.replace("/");
    }
  };

  const handleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Sign in failed", error);
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
            <ul className="grid w-[200px] gap-1">
              {RECIPE_CATEGORY.map((category) => (
                <li key={category}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/search?category=${encodeURIComponent(category)}`}
                    >
                      {category}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Cuisine</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1">
              {RECIPE_CUISINE.map((cuisine) => (
                <li key={cuisine}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/search?cuisine=${encodeURIComponent(cuisine)}`}
                    >
                      {cuisine}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {
          !isPending ? (
            session ? (
              <NavigationMenuItem className="ml-auto">
                <NavigationMenuTrigger aria-label="User menu">
                  <User />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="right-0 left-auto">
                  <ul className="grid w-[100px] gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/admin"
                          className="flex-row items-center justify-center gap-2"
                        >
                          <FilePenLine />
                          Admin
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Button
                          variant="outline"
                          onClick={handleLogout}
                          className="flex-row items-center gap-2 w-full"
                        >
                          <LogOut />
                          Logout
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="ml-auto">
                <NavigationMenuTrigger aria-label="Login menu">
                  Login
                </NavigationMenuTrigger>
                <NavigationMenuContent className="right-0 left-auto">
                  <Button onClick={handleLogin} className="px-6">
                    <Image
                      src="/google.svg"
                      alt="Google logo"
                      width={20}
                      height={20}
                    />
                    <span className="dark:text-gray-300">
                      Login with Google
                    </span>
                  </Button>
                  <p className="text-muted-foreground pt-2 text-xs text-center">
                    Access restricted to authorized accounts
                  </p>
                </NavigationMenuContent>
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
