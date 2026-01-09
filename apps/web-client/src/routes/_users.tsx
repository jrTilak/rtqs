import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { ROLE } from "@/server/constants";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_users")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { isPending, error, data } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (error || !data?.user) navigate({ to: "/login" });
    if (data?.user?.role === ROLE.ADMIN) navigate({ to: "/admin" });
  }, [isPending, data, error]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-dvh">
        <Spinner size={"xl"} className="text-primary" />
      </div>
    );
  }
  return <Outlet />;
}
