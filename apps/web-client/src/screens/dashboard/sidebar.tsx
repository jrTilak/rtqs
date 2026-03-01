import {
  Sidebar as _Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { OrgSwitcher } from "./org/org-switcher";
import { NavUser } from "./nav-user";

export function Sidebar({ ...props }: React.ComponentProps<typeof _Sidebar>) {
  return (
    <_Sidebar {...props}>
      <SidebarHeader className="border-b">
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))} */}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
    </_Sidebar>
  );
}
