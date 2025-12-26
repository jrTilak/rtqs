"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain, type NavMainProps } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { PieChart, UsersRound } from "lucide-react";

const SIDEBAR_LINKS: NavMainProps[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: PieChart,
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: UsersRound,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_LINKS.map((item) => (
          <NavMain title={item.title} items={item.items} key={item.title} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
