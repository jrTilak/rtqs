import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <Sidebar variant={"inset"} collapsible={"offcanvas"} side={"left"} />
      <SidebarInset>
        <Header />
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
