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
import { ProductList } from "@/modules/dashboard/product/ui/view/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { productSearchParams } from "@/modules/dashboard/product/filter/params";

export const metadata: Metadata = {
  title: "Products",
  description: "Product list",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

const Products = async ({ searchParams }: Props) => {
  const params = await productSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.product.getMany.queryOptions({
      ...params,
    })
  );

  return (
    <ContentLayout navChildren={<NavChildren />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <ProductList />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Products;

const NavChildren = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
