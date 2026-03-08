import { format } from "date-fns";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { UniqueBadge } from "@/components/unique-badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { server } from "@/server/rest-api";
import { Button } from "@/components/ui/button";
import type { Invitation } from "better-auth/plugins";
import { confirm } from "@/components/ui/confirm-dialog";
import { DataTable } from "@/components/blocks/data-table";
import { P } from "@/components/ui/typography";
import { Spinner } from "@/components/ui/spinner";
import { useMemo } from "react";
const Invitations = () => {
  const listInvitationsQuery = useQuery(server.orgs.listInvitationsOptions());

  return (
    <div className="-mt-9">
      <DataTable
        data={listInvitationsQuery?.data ?? []}
        action={(row) => (
          <InvitationActions
            invitation={
              row as Parameters<typeof InvitationActions>[0]["invitation"]
            }
          />
        )}
        defaultSorting={[{ id: "createdAt", desc: true }]}
        columns={[
          {
            accessorFn: (row) => row.email,
            id: "email",
            header: "Email",
            enableSorting: true,
            enableGlobalFilter: true,
          },
          {
            accessorFn: (row) => row.createdAt.toISOString(),
            id: "createdAt",
            header: "Invited",
            cell: ({ row }) => {
              return format(row.original.createdAt, "MMM d, yyyy");
            },
            enableSorting: true,
            enableGlobalFilter: false,
          },
          {
            accessorFn: (row) => row.expiresAt.toISOString(),
            id: "expiresAt",
            header: "Expires",
            cell: ({ row }) => {
              return format(row.original.expiresAt, "MMM d, yyyy");
            },
            enableSorting: true,
            enableGlobalFilter: false,
          },
          {
            accessorFn: (row) => row.role,
            id: "role",
            header: "Role",
            cell: ({ row }) => {
              return <UniqueBadge>{row.original.role}</UniqueBadge>;
            },
            enableSorting: true,
            enableGlobalFilter: false,
          },
          {
            accessorFn: (row) => row.status,
            id: "status",
            header: "Status",
            cell: ({ row }) => {
              return <UniqueBadge>{row.original.status}</UniqueBadge>;
            },
            enableSorting: true,
          },
        ]}
      >
        <div className="space-y-3">
          <div className="flex justify-end items-center gap-2">
            <DataTable.Search containerProps={{ className: "w-52" }} />
            <DataTable.Adjustments />
            <Button
              onClick={() => listInvitationsQuery.refetch()}
              isLoading={listInvitationsQuery.isRefetching}
              variant="outline"
              size={"icon"}
            >
              <Icon name={ICONS_ENUM.REFRESH} />
            </Button>
          </div>
          <DataTable.TableRoot className="border rounded-md">
            <DataTable.Header />
            <DataTable.Body>
              {listInvitationsQuery.isLoading ? (
                <DataTable.FullRow>
                  <Spinner className="mx-auto text-muted-foreground" />
                </DataTable.FullRow>
              ) : listInvitationsQuery.isError ? (
                <DataTable.FullRow>
                  <P className="text-sm text-destructive text-center">
                    An error occurred while loading invitations.
                  </P>
                </DataTable.FullRow>
              ) : listInvitationsQuery.data?.length === 0 ? (
                <DataTable.FullRow>
                  <P className="text-sm text-center">No invitations found.</P>
                </DataTable.FullRow>
              ) : (
                <DataTable.Rows />
              )}
            </DataTable.Body>
            <DataTable.Footer />
          </DataTable.TableRoot>
        </div>
      </DataTable>
    </div>
  );
};

export { Invitations };

const InvitationActions = ({ invitation }: { invitation: Invitation }) => {
  const queryClient = useQueryClient();
  const cancelInvitationMutation = useMutation(
    server.orgs.cancelInvitationOptions(queryClient),
  );

  const onClick = async () => {
    const shouldCancel = await confirm({
      title: "Cancel invitation?",
      description: `Are you sure you want to cancel the invitation for ${invitation.email}?`,
      action: "Yes, Cancel",
      variant: "destructive",
      waitUntilAction: 2,
    });
    if (!shouldCancel) return;
    cancelInvitationMutation.mutate({
      invitationId: invitation.id,
    });
  };

  return (
    <Button
      onClick={onClick}
      isLoading={cancelInvitationMutation.isPending}
      variant="ghost"
      size="icon"
      disabled={invitation.status !== "pending"}
      className="text-destructive hover:text-destructive/80"
    >
      <Icon name={ICONS_ENUM.TRASH} />
    </Button>
  );
};
