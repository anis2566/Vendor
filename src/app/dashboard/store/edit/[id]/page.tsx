import { Metadata } from "next";
import Link from "next/link";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
import { EditStoreForm } from "@/modules/dashboard/store/ui/view/edit-store-form";

export const metadata: Metadata = {
  title: "Edit Store",
  description: "Edit Store",
};

interface Props {
  params: Promise<{ id: string }>;
}

const EditStore = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.store.getOne.queryOptions({
      id,
    })
  );

  return (
    <ContentLayout navChildren={<NavChildren />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <EditStoreForm id={id} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </ContentLayout>
  );
};

export default EditStore;

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
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/dashboard/store">Stores</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Edit</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
