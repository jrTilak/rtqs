import { DashboardLayout } from "@/screens/dashboard/dashboard-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/d")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
