import { AdminLayout } from "@/components/layout/admin";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
