import Link from "next/link";
import { getAllCategories } from "@/lib/dal/category";
import { getAllCuisines } from "@/lib/dal/cuisine";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export const DesktopNav = async () => {
  const categories = await getAllCategories();
  const cuisines = await getAllCuisines();

  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1">
                {categories.map((category) => (
                  <li key={category.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/search?category=${encodeURIComponent(category.name)}`}
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Cuisine</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1">
                {cuisines.map((cuisine) => (
                  <li key={cuisine.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/search?cuisine=${encodeURIComponent(cuisine.name)}`}
                      >
                        {cuisine.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
