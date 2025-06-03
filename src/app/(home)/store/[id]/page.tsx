import Banner from "@/modules/home/store/ui/view/banner";
import { FeatureProducts } from "@/modules/home/store/ui/view/feature-products";
import { Products } from "@/modules/home/store/ui/view/products";

interface Props {
  params: Promise<{ id: string }>;
}

const Store = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen mt-6">
      <div className="w-full space-y-6">
        <Banner />
        <FeatureProducts />
        <Products />
      </div>
    </div>
  );
};

export default Store;
