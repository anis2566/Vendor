import { getStore } from "@/lib/vendor.action";
import { Overview } from "../components/overview";
import { RecentOrders } from "./recent-orders";
import { SalesChart } from "./sales-chart";
import { ShopInfo } from "./shop-info";

export const VendorDashboard = async () => {
  const store = await getStore();

  return (
    <div className="w-full space-y-6">
      <ShopInfo store={store} />
      <Overview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentOrders />
        <SalesChart />
      </div>
    </div>
  );
};
