"use client";

import { UserButton } from "@clerk/clerk-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

interface Props {
    children: React.ReactNode;
    navChildren: React.ReactNode;
}

export const ContentLayout = ({ children, navChildren }: Props) => {
    return (
        <div className="space-y-4">
            <header className="flex justify-between h-16 border-b border-b-muted pr-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {navChildren}
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <UserButton />
                </div>
            </header>

            <main className="px-4">
                {children}
            </main>
        </div>
    )
}