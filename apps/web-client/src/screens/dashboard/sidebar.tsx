import {
  Sidebar as _Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrgSwitcher } from "./members/org/org-switcher";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { Separator } from "@/components/ui/separator";
import type { ComponentProps } from "react";

const LINKS: ComponentProps<typeof NavMain>[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/d",
        icon: ICONS_ENUM.DASHBOARD,
      },
      {
        title: "Quizzes",
        url: "/d/quizzes",
        icon: ICONS_ENUM.QUIZ,
      },
    ],
  },
  {
    label: "Collaboration",
    items: [
      {
        title: "Members",
        url: "/d/org/members",
        icon: ICONS_ENUM.USERS,
      },
    ],
  },
  {
    label: "More",
    className: "mt-auto",
    items: [
      {
        title: "Settings",
        url: "/d/org/settings",
        icon: ICONS_ENUM.SETTINGS,
      },
      {
        title: "Plugins",
        url: "/d/plugins",
        icon: ICONS_ENUM.PLUGINS,
      },
    ],
  },
];

export function Sidebar({ ...props }: React.ComponentProps<typeof _Sidebar>) {
  return (
    <_Sidebar {...props}>
      <SidebarHeader className="px-0 py-0">
        <OrgSwitcher />
      </SidebarHeader>
      <Separator className="my-1" />
      <SidebarContent>
        {LINKS.map((l) => (
          <NavMain {...l} key={l.label} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </_Sidebar>
  );
}
