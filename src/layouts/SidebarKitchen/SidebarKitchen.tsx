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
import { ShoppingBag } from "lucide-react";
import { NavKitchen } from "./NavKitchen";
import { NavUser } from "../Sidebar/NavUser";

const data = {
  user: {
    name: "SiWahyu",
    email: "siwahyu@example.com",
    avatar: "/avatar.webp",
  },
  navKitchen: [
    {
      title: "Order",
      url: "/kitchen/order",
      icon: <ShoppingBag />,
    },
  ],
};

export function SidebarKitchen({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
        <NavKitchen items={data.navKitchen} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
