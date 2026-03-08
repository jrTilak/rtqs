import type { RouterContext } from "@/main";
import { server } from "@/server/rest-api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/d/org")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient } = context as RouterContext;
    await queryClient.prefetchQuery(server.orgs.getMyRoleOptions());
  },
});

function RouteComponent() {
  return <Outlet />;
}
