import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}