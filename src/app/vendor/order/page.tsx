import { Metadata } from "next";
import Link from "next/link";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/modules/dashboard/ui/components/content-layout";
import { getQueryClient, trpc } from "@/trpc/server";
import { orderSearchParams } from "@/modules/vendor/order/filter/params";
import { OrderList } from "@/modules/vendor/order/ui/view/order-list";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

const Orders = async ({ searchParams }: Props) => {
  const params = await orderSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.order.vendorGetMany.queryOptions({
      ...params,
    })
  );

  return (
    <ContentLayout navChildren={<NavChildren />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <OrderList />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Orders;

const NavChildren = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/vendor">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Orders</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
