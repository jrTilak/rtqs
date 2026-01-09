import { AdminLayout } from "@/components/layout/admin";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { ROLE } from "@/server/constants";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { isPending, error, data } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (error || !data?.user) navigate({ to: "/login" });
    if (data?.user?.role === ROLE.USER) navigate({ to: "/" });
  }, [isPending, data, error]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-dvh">
        <Spinner size={"xl"} className="text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
