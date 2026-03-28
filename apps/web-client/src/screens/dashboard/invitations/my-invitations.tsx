import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UniqueBadge } from "@/components/unique-badge";
import { OrgLogo } from "@/screens/dashboard/members/org/org-logo";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { server } from "@/server/rest-api";
import { QueryState } from "@/components/ui/query-state";
import type { Invitation } from "better-auth/plugins";
import { confirm } from "@/components/ui/confirm-dialog";

/** Mock type for an invitation received by the current user to join an org */
type MockReceivedInvitation = {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  organizationLogo?: string | null;
  role: string;
  invitedAt: string;
  expiresAt: string;
};

const MOCK_INVITATIONS: MockReceivedInvitation[] = [
  {
    id: "inv-1",
    organizationId: "org-1",
    organizationName: "Acme Inc",
    organizationSlug: "acme-inc",
    organizationLogo: null,
    role: "member",
    invitedAt: "2025-02-28T10:00:00Z",
    expiresAt: "2025-03-14T10:00:00Z",
  },
  {
    id: "inv-2",
    organizationId: "org-2",
    organizationName: "Design Studio",
    organizationSlug: "design-studio",
    organizationLogo: null,
    role: "admin",
    invitedAt: "2025-03-01T14:30:00Z",
    expiresAt: "2025-03-15T14:30:00Z",
  },
];

const MyInvitations = () => {
  const listMyInvitationsQuery = useQuery(server.orgs.listMyInvitationsOptions);

  return (
    <Card className="py-0">
      <QueryState
        {...listMyInvitationsQuery}
        isEmpty={listMyInvitationsQuery.data?.length === 0}
      >
        <QueryState.Data>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium pl-4 py-1">
                  Organization
                </TableHead>
                <TableHead className="font-medium py-1">Role</TableHead>
                <TableHead className="font-medium py-1">Invited</TableHead>
                <TableHead className="font-medium py-1">Expires</TableHead>
                <TableHead className="font-medium "></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listMyInvitationsQuery.data?.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md border bg-accent text-foreground">
                        <OrgLogo src={""} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {inv.organizationName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize py-1">
                    <UniqueBadge>{inv.role}</UniqueBadge>
                  </TableCell>
                  <TableCell className="py-1 text-muted-foreground text-sm">
                    {format(new Date(inv.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="py-1 text-muted-foreground text-sm">
                    {format(new Date(inv.expiresAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="py-1 pr-4">
                    <MyInvitationActions invitation={inv} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </QueryState.Data>
        <QueryState.Empty>
          You don&apos;t have any pending invitations.
        </QueryState.Empty>
        <QueryState.Error />
        <QueryState.Loading />
      </QueryState>
    </Card>
  );
};

const MyInvitationActions = ({
  invitation,
}: {
  invitation: Invitation & { organizationName: string };
}) => {
  const queryClient = useQueryClient();
  const rejectInvitationMutation = useMutation(
    server.orgs.rejectInvitationOptions(queryClient),
  );
  const acceptInvitationMutation = useMutation(
    server.orgs.acceptInvitationOptions(queryClient),
  );

  const onReject = async () => {
    const shouldReject = await confirm({
      title: "Reject invitation",
      description: `Are you sure you want to reject the invitation for ${invitation.organizationName}?`,
      action: "Yes, Reject",
      variant: "destructive",
      waitUntilAction: 2,
    });
    if (!shouldReject) return;
    rejectInvitationMutation.mutate({
      invitationId: invitation.id,
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="destructive-ghost"
        size="sm"
        onClick={onReject}
        isLoading={rejectInvitationMutation.isPending}
      >
        Reject
      </Button>
      <Button
        size="sm"
        onClick={() => {
          acceptInvitationMutation.mutate({
            invitationId: invitation.id,
          });
        }}
        isLoading={acceptInvitationMutation.isPending}
      >
        Accept
      </Button>
    </div>
  );
};

export { MyInvitations };
