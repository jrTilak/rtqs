import {
  Sidebar as _Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrgSwitcher } from "./org/org-switcher";
import { ICONS_ENUM } from "@rtqs/plugin-loader";

export function Sidebar({ ...props }: React.ComponentProps<typeof _Sidebar>) {
  return (
    <_Sidebar {...props}>
      <SidebarHeader className="border-b">
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          label="More"
          className="mt-auto"
          items={[
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
          ]}
        />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </_Sidebar>
  );
}
