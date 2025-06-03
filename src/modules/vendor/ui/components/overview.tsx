import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

import { OverviewCard } from "./overview-card";

export const Overview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <OverviewCard
        title="Today Sales"
        value="$12,345"
        icon={DollarSign}
        change="+20.1%"
      />
      <OverviewCard
        title="Total Sales"
        value="+573"
        icon={DollarSign}
        change="+12%"
      />
      <OverviewCard
        title="Today Orders"
        value="127"
        icon={DollarSign}
        change="+3 new this week"
      />
      <OverviewCard
        title="Orders"
        value="127"
        icon={DollarSign}
        change="+3 new this week"
      />
      <OverviewCard
        title="Products"
        value="1,234"
        icon={Package}
        change="+18%"
      />
    </div>
  );
};
