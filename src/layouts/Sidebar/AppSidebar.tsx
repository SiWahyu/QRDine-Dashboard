"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  LayoutGrid,
  ShoppingBag,
  HandPlatter,
  Armchair,
} from "lucide-react";
import { NavUser } from "./NavUser";
import { NavMain } from "./NavMain";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "SiWahyu",
    email: "siwahyu@example.com",
    avatar: "/avatar.webp",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Order",
      url: "/dashboard/order",
      icon: <ShoppingBag />,
    },
    {
      title: "Category",
      url: "/dashboard/category",
      icon: <LayoutGrid />,
      items: [
        {
          title: "All Category",
          url: "/dashboard/category",
        },
        {
          title: "Create Category",
          url: "/dashboard/category/create",
        },
      ],
    },
    {
      title: "Menu",
      url: "/dashboard/menu",
      icon: <HandPlatter />,
      items: [
        {
          title: "All Menu",
          url: "/dashboard/menu",
        },
        {
          title: "Create Menu",
          url: "/dashboard/menu/create",
        },
      ],
    },
    {
      title: "Table",
      url: "/dashboard/table",
      icon: <Armchair />,
      items: [
        {
          title: "All Table",
          url: "/dashboard/table",
        },
        {
          title: "Create Table",
          url: "/dashboard/table/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMain = data.navMain.map((item) => ({
    ...item,
    isActive:
      item.title === "Dashboard"
        ? pathname === item.url
        : pathname.startsWith(item.url),
  }));

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <a href="#">
                <span className="text-lg font-semibold">QRDine</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
