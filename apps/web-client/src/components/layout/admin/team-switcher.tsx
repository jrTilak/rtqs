import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent"
        >
          <div className="bg-muted border text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <img
              src={import.meta.env.VITE_PUBLIC_APP_LOGO_URL}
              className="size-4 object-contain object-center"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {import.meta.env.VITE_PUBLIC_APP_NAME}
            </span>
            <span className="truncate text-xs">Admin</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
