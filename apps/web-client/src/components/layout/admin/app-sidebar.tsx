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
import { PieChart, UsersRound, ListChecks,Gamepad} from "lucide-react";

const SIDEBAR_LINKS: NavMainProps[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: PieChart,
      },
      {
        title: "Play Quiz",
        url: "/admin/play-quiz",
        icon: Gamepad,
      }
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
      {
        title : "Quizzes",
        url: "/admin/quizzes",
        icon: ListChecks,
      }
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
