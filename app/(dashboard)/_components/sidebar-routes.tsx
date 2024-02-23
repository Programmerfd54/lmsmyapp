"use client";

import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Панель",
        href: "/",
    },
    {
        icon: Compass,
        label: "Просмотреть",
        href: "/search",
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Курсы",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Анализ",
        href: "/teacher/analytics",
    }
]

export const SideBarRoutes = () => {
    
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ?  teacherRoutes : guestRoutes;

    return(
        <div className="flex flex-col w-full">
            {routes.map((route)=>(
                <SidebarItem
                  key={route.href}
                  icon={route.icon}
                  label={route.label}
                  href={route.href}
                />
            ))}
        </div>
    )
}