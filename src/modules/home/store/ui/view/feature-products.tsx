import FeatureProductCard from "@/components/commerce-ui/feature-product-card";

export const FeatureProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FeatureProductCard />
      <FeatureProductCard />
    </div>
  );
};
