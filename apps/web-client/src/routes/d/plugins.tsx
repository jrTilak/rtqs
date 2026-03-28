import { PluginsScreen } from "@/screens/dashboard/plugins/plugins-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/d/plugins")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PluginsScreen />;
}
