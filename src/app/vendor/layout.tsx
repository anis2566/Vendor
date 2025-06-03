import { getUserOrRedirect } from "@/lib/user.action";
import { DashboardLayout } from "@/modules/vendor/ui/view/layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const user = await getUserOrRedirect();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
};

export default Layout;
