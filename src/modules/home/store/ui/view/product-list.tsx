import ProductCard from "@/components/product-card";
import { Sort } from "./sort";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const ProductList = () => {
  return (
    <div className="md:col-span-3 md:border-l md:border-muted p-3 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">All Products</h1>
          <p className="text-sm text-muted-foreground">
            Showing 2 out of 24 products
          </p>
        </div>
        <Sort />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load more</Button>
      </div>
    </div>
  );
};
