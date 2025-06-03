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
import { BrandList } from "@/modules/dashboard/brand/ui/view/brand-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { brandSearchParams } from "@/modules/dashboard/brand/filter/params";

export const metadata: Metadata = {
  title: "Brands",
  description: "Brand list",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

const Brands = async ({ searchParams }: Props) => {
  const params = await brandSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.brand.getMany.queryOptions({
      ...params,
    })
  );

  return (
    <ContentLayout navChildren={<NavChildren />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <BrandList />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Brands;

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
          <BreadcrumbPage>Brands</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
