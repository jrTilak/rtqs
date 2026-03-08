import { createFileRoute } from "@tanstack/react-router";
import { DashboardContainer } from "@/screens/dashboard/dashboard-container";
import { MyInvitations } from "@/screens/dashboard/invitations/my-invitations";

export const Route = createFileRoute("/d/invitations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardContainer
      title="Invitations"
      description="Invitations you've received to join organizations"
    >
      <MyInvitations />
    </DashboardContainer>
  );
}
