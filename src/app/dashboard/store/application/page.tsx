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
import { StoreApplications } from "@/modules/dashboard/store/ui/view/store-applications";
import { getQueryClient, trpc } from "@/trpc/server";
import { applicationSearchParams } from "@/modules/dashboard/store/filter/params";

export const metadata: Metadata = {
  title: "Applications",
  description: "Application",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

const Applications = async ({ searchParams }: Props) => {
  const params = await applicationSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.store.applications.queryOptions({
      ...params,
    })
  );

  return (
    <ContentLayout navChildren={<NavChildren />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <StoreApplications />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default Applications;

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
          <BreadcrumbPage>Applications</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
