import { createFileRoute } from "@tanstack/react-router";
import { DashboardContainer } from "@/screens/dashboard/dashboard-container";
import { InviteMembers } from "@/screens/dashboard/members/invite-members";
import { OrgMembers } from "@/screens/dashboard/members/org-members";
import { useQuery } from "@tanstack/react-query";
import { server } from "@/server/rest-api";
import { ORG_ROLES } from "@/server/rest-api/organizations";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/d/org/members")({
  component: RouteComponent,
});

function RouteComponent() {
  const getMyRoleQuery = useQuery(server.orgs.getMyRoleOptions());
  return (
    <DashboardContainer
      title="Members"
      description="Manage organization members and invitations"
    >
      {getMyRoleQuery.isLoading ? (
        <Skeleton className="h-50.75 w-full" />
      ) : (
        getMyRoleQuery.data?.role !== ORG_ROLES.MEMBER && <InviteMembers />
      )}
      <OrgMembers />
    </DashboardContainer>
  );
}
