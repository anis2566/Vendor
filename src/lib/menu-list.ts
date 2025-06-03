import {
  LayoutGrid,
  LucideIcon,
  List,
  PlusCircle,
  Users,
  UsersRound,
  Shovel,
  Pill,
  SquareStack,
  Ambulance,
  Calendar,
  DollarSign,
  Dessert,
  ShieldQuestion,
  FileQuestion,
  Frame,
  PenLine,
  School,
  BookOpen,
  Layers3,
  ClipboardPen,
  Pen,
  NotebookPen,
  ContactRound,
  Package,
  Ribbon,
  Store,
  ShoppingBag,
  FileSpreadsheet,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main ",
      menus: [
        {
          href: "",
          label: "Brand",
          active: pathname.includes("/dashboard/brand"),
          icon: Ribbon,
          submenus: [
            {
              href: "/dashboard/brand/new",
              label: "New",
              active: pathname === "/dashboard/brand/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/brand",
              label: "List",
              active: pathname === "/dashboard/brand",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Category",
          active: pathname.includes("/dashboard/category"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/category/new",
              label: "New",
              active: pathname === "/dashboard/category/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/category",
              label: "List",
              active: pathname === "/dashboard/category",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Product",
          active: pathname.includes("/dashboard/products"),
          icon: Package,
          submenus: [
            {
              href: "/dashboard/product/new",
              label: "New",
              active: pathname === "/dashboard/products/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/product",
              label: "List",
              active: pathname === "/dashboard/products",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Store",
          active: pathname.includes("/dashboard/store"),
          icon: Store,
          submenus: [
            {
              href: "/dashboard/store/new",
              label: "New",
              active: pathname === "/dashboard/store/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/store",
              label: "List",
              active: pathname === "/dashboard/store",
              icon: List,
            },
            {
              href: "/dashboard/store/application",
              label: "Application",
              active: pathname === "/dashboard/store/application",
              icon: FileSpreadsheet,
            },
          ],
        },
      ],
    },
  ];
}

export function getVendorMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/vendor",
          label: "Dashboard",
          active: pathname === "/vendor",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main ",
      menus: [
        {
          href: "",
          label: "Product",
          active: pathname.includes("/vendor/product"),
          icon: Package,
          submenus: [
            {
              href: "/vendor/product/new",
              label: "New",
              active: pathname === "/vendor/product/new",
              icon: PlusCircle,
            },
            {
              href: "/vendor/product",
              label: "List",
              active: pathname === "/vendor/product",
              icon: List,
            },
          ],
        },
        {
          href: "/vendor/order",
          label: "Order",
          active: pathname.includes("/vendor/order"),
          icon: ShoppingBag,
          submenus: [],
        },
        {
          href: "/dashboard/treatments",
          label: "Treatments",
          active: pathname.includes("/dashboard/treatments"),
          icon: Shovel,
          submenus: [],
        },
        {
          href: "",
          label: "Medicines",
          active: pathname.includes("/dashboard/medicines"),
          icon: Pill,
          submenus: [
            {
              href: "/dashboard/medicines",
              label: "List",
              active: pathname === "/dashboard/medicines",
              icon: List,
            },
            {
              href: "/dashboard/medicines/generics",
              label: "Generics",
              active: pathname === "/dashboard/medicines/generics",
              icon: SquareStack,
            },
            {
              href: "/dashboard/medicines/manufacturers",
              label: "Manufacturers",
              active: pathname === "/dashboard/medicines/manufacturers",
              icon: Ambulance,
            },
          ],
        },
        {
          href: "",
          label: "Appointments",
          active: pathname.includes("/dashboard/appointments"),
          icon: Calendar,
          submenus: [
            {
              href: "/dashboard/appointments/new",
              label: "New",
              active: pathname === "/dashboard/appointments/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/appointments",
              label: "List",
              active: pathname === "/dashboard/appointments",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Payments",
          active: pathname.includes("/dashboard/payments"),
          icon: DollarSign,
          submenus: [
            {
              href: "/dashboard/payments/new",
              label: "New",
              active: pathname === "/dashboard/payments/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/payments",
              label: "List",
              active: pathname === "/dashboard/payments",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Services",
          active: pathname.includes("/dashboard/services"),
          icon: Dessert,
          submenus: [
            {
              href: "/dashboard/services/new",
              label: "New",
              active: pathname === "/dashboard/services/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/services",
              label: "List",
              active: pathname === "/dashboard/services",
              icon: List,
            },
          ],
        },
      ],
    },
  ];
}
