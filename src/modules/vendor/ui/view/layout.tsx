"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

import { User } from "@/generated/prisma";
import { StoreApplication } from "../../apply/ui/view/store-application";
import { AccountStatus } from "../../apply/ui/view/account-status";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

export const DashboardLayout = ({ children, user }: LayoutProps) => {
  const isVendor = user.role === "Vendor";
  const isApproved = user.status === "Approved";

  if (!isVendor) return <StoreApplication userId={user.id} />;

  if (!isApproved) return <AccountStatus userId={user.id} />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
};
