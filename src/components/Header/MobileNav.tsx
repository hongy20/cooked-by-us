import { Menu } from "lucide-react";
import Link from "next/link";
import { getAllCategories } from "@/lib/dal/category";
import { getAllCuisines } from "@/lib/dal/cuisine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const MobileNav = async () => {
  const categories = await getAllCategories();
  const cuisines = await getAllCuisines();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col space-y-2 px-4">
            <Link href="/" className="rounded hover:bg-accent">
              Home
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="categories">
                <AccordionTrigger className="">Categories</AccordionTrigger>
                <AccordionContent className="flex flex-col pl-4 space-y-1">
                  {categories.length === 0 ? (
                    <span className="p-2 text-sm text-muted-foreground">
                      No categories available
                    </span>
                  ) : (
                    categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/search?category=${encodeURIComponent(category.name)}`}
                        className="p-2 rounded hover:bg-accent"
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cuisine">
                <AccordionTrigger className="">Cuisines</AccordionTrigger>
                <AccordionContent className="flex flex-col pl-4 space-y-1">
                  {cuisines.length === 0 ? (
                    <span className="p-2 text-sm text-muted-foreground">
                      No cuisines available
                    </span>
                  ) : (
                    cuisines.map((cuisine) => (
                      <Link
                        key={cuisine.name}
                        href={`/search?cuisine=${encodeURIComponent(cuisine.name)}`}
                        className="p-2 rounded hover:bg-accent"
                      >
                        {cuisine.name}
                      </Link>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/about" className="rounded hover:bg-accent">
              About
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
