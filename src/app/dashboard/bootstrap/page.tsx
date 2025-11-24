"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const capitalizeFirst = (str: string) => str?.[0].toUpperCase() + str.slice(1);

const types = ["cuisines", "categories", "recipes"] as const;
type TypeValue = (typeof types)[number];

export default function BootstrapPage() {
  const handleBootstrap = (type: TypeValue) => {
    // call server action here
    console.log("Bootstrap:", type);
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
