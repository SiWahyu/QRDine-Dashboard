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
import { UserType } from "@/types/user";

const adminNavItems = [
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
];

const kitchenNavItems = [
  {
    title: "Order",
    url: "/kitchen/order",
    icon: <ShoppingBag />,
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: UserType;
}) {
  const pathname = usePathname();
  const isAdmin = user.role === "admin";

  const navItems = isAdmin ? adminNavItems : kitchenNavItems;
  const navLabel = isAdmin ? "Dashboard" : "Kitchen";

  const activeNavItems = navItems.map((item) => ({
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
        <NavMain items={activeNavItems} label={navLabel} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            ...user,
            avatar: "/avatar.webp",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
