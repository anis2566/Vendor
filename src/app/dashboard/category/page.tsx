import { Metadata } from "next";
import Link from "next/link";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { SearchParams } from "nuqs";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { ContentLayout } from "@/modules/dashboard/ui/components/content-layout";
import { CategoryList } from "@/modules/dashboard/category/ui/view/category-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { categorySearchParams } from "@/modules/dashboard/category/filter/params";

export const metadata: Metadata = {
    title: "Categories",
    description: "Category list",
};

interface Props {
    searchParams: Promise<SearchParams>
}

const Categories = async ({ searchParams }: Props) => {
    const params = await categorySearchParams(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.category.getMany.queryOptions({
        ...params
    }))

    return (
        <ContentLayout navChildren={<NavChildren />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<p>Loading</p>}>
                    <ErrorBoundary fallback={<p>Error</p>}>
                        <CategoryList />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </ContentLayout>
    )
}

export default Categories

const NavChildren = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                        <Link href="/user">
                            Dashboard
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>Categories</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
