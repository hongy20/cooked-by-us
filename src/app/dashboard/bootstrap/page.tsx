"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  bootstrapCategoriesAction,
  bootstrapCuisinesAction,
  bootstrapRecipesAction,
} from "@/lib/action/bootstrap";

const capitalizeFirst = (str: string) => str?.[0].toUpperCase() + str.slice(1);

const types = ["cuisines", "categories", "recipes"] as const;
type TypeValue = (typeof types)[number];

export default function BootstrapPage() {
  const handleBootstrap = async (type: TypeValue) => {
    const actionByType: Record<TypeValue, () => Promise<unknown>> = {
      categories: bootstrapCategoriesAction,
      cuisines: bootstrapCuisinesAction,
      recipes: bootstrapRecipesAction,
    };

    return actionByType[type]()
      .then(() => toast.success("Bootstrap succeeded"))
      .catch(() => toast.error("Bootstrap failed"));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bootstrapping</h1>
      </div>

      {/* Container card to match dashboard style */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select what to bootstrap</CardTitle>
          <CardDescription>
            Demo data for the purpose of development...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {types.map((type) => (
              <Button
                key={type}
                variant="outline"
                className="flex-1"
                onClick={() => handleBootstrap(type)}
              >
                {capitalizeFirst(type)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
