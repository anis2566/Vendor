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
                    label: "Subject",
                    active: pathname.includes("/dashboard/subjects"),
                    icon: BookOpen,
                    submenus: [
                        {
                            href: "/dashboard/subject/new",
                            label: "New",
                            active: pathname === "/dashboard/subjects/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/subject",
                            label: "List",
                            active: pathname === "/dashboard/subjects",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "",
                    label: "Chapter",
                    active: pathname.includes("/dashboard/chapters"),
                    icon: Layers3,
                    submenus: [
                        {
                            href: "/dashboard/chapter/new",
                            label: "New",
                            active: pathname === "/dashboard/chapters/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/dashboard/chapter",
                            label: "List",
                            active: pathname === "/dashboard/chapters",
                            icon: List,
                        },
                    ],
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

export function getUserMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/user",
                    label: "Dashboard",
                    active: pathname === "/user",
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Exams ",
            menus: [
                {
                    href: "",
                    label: "Exams",
                    active: pathname.includes("/user/exams"),
                    icon: PenLine,
                    submenus: [
                        {
                            href: "/user/exams/new",
                            label: "New",
                            active: pathname === "/user/exams/new",
                            icon: PlusCircle,
                        },
                        {
                            href: "/user/exams",
                            label: "List",
                            active: pathname === "/user/exams",
                            icon: List,
                        },
                    ],
                },
                {
                    href: "/user/feedback",
                    label: "Feedback",
                    active: pathname.includes("/user/feedback"),
                    icon: ClipboardPen,
                    submenus: [
                        {
                            href: "/user/feedback/exam",
                            label: "Exam",
                            active: pathname === "/user/feedback/exam",
                            icon: NotebookPen,
                        },
                        {
                            href: "/user/feedback/interview",
                            label: "Interview",
                            active: pathname === "/user/feedback/interview",
                            icon: ContactRound,
                        },
                    ],
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