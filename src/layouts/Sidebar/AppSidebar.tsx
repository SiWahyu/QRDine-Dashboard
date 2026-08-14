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
  ChefHat,
  Utensils,
} from "lucide-react";
import { NavUser } from "./NavUser";
import { NavMain } from "./NavMain";
import { NavKitchen } from "./NavKitchen";

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
      url: "#",
      icon: <LayoutGrid />,
      isActive: true,
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
      url: "#",
      icon: <HandPlatter />,
      isActive: true,
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
      url: "#",
      icon: <Utensils />,
      isActive: true,
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
  kitchen: [
    {
      name: "Order",
      url: "#",
      icon: <ChefHat />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        <NavKitchen items={data.kitchen} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
