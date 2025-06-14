import { DashboardLayout } from "@/modules/dashboard/ui/view/layout";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default Layout

