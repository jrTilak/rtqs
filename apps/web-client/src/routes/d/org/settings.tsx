import { OrgSettingsScreen } from "@/screens/dashboard/members/org/org-settings-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/d/org/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrgSettingsScreen />;
}
