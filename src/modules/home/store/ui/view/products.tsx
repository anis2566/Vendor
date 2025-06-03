import { Filter } from "./filter";
import { ProductList } from "./product-list";

export const Products = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Filter />
        <ProductList />
      </div>
    </div>
  );
};
