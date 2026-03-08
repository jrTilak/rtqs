import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { UniqueBadge } from "@/components/unique-badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { server } from "@/server/rest-api";
import type { Member } from "better-auth/plugins";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ORG_ROLES } from "@/server/rest-api/organizations";
import { confirm } from "@/components/ui/confirm-dialog";
import type { User } from "better-auth";
import { DataTable } from "@/components/blocks/data-table";
import { P } from "@/components/ui/typography";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "@tanstack/react-router";

const TeamMembers = () => {
  const listMembersQuery = useQuery(server.orgs.listMembersOptions());

  return (
    <div className="-mt-9">
      <DataTable
        data={listMembersQuery?.data?.members ?? []}
        action={(row) => (
          <TeamMemberActions
            member={row as Parameters<typeof TeamMemberActions>[0]["member"]}
          />
        )}
        defaultSorting={[{ id: "createdAt", desc: true }]}
        columns={
          [
            {
              accessorFn: (row) => row.user.name,
              id: "name",
              header: "Member",
              enableSorting: true,
              enableGlobalFilter: true,
            },
            {
              accessorFn: (row) => row.createdAt.toISOString(),
              id: "createdAt",
              header: "Joined",
              cell: ({ row }) => {
                return format(row.original.createdAt, "MMM d, yyyy");
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
              accessorFn: (row) => row.user.email,
              id: "email",
              header: "Email",
              enableSorting: true,
              enableGlobalFilter: true,
            },
          ] as const
        }
      >
        <div className="space-y-3">
          <div className="flex justify-end items-center gap-2">
            <DataTable.Search containerProps={{ className: "w-52" }} />
            <DataTable.Adjustments />
            <Button
              onClick={() => listMembersQuery.refetch()}
              isLoading={listMembersQuery.isRefetching}
              variant="outline"
              size={"icon"}
            >
              <Icon name={ICONS_ENUM.REFRESH} />
            </Button>
          </div>
          <DataTable.TableRoot className="border rounded-md">
            <DataTable.Header />
            <DataTable.Body>
              {listMembersQuery.isLoading ? (
                <DataTable.FullRow>
                  <Spinner className="mx-auto text-muted-foreground" />
                </DataTable.FullRow>
              ) : listMembersQuery.isError ? (
                <DataTable.FullRow>
                  <P className="text-sm text-destructive text-center">
                    An error occurred while loading members.
                  </P>
                </DataTable.FullRow>
              ) : listMembersQuery.data?.members.length === 0 ? (
                <DataTable.FullRow>
                  <P className="text-sm text-center">No members found.</P>
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

const TeamMemberActions = ({
  member,
}: {
  member: Member & {
    user: User;
  };
}) => {
  const user = server.auth.useUser();
  const getMyRoleQuery = useQuery(server.orgs.getMyRoleOptions());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const removeMemberMutation = useMutation(
    server.orgs.removeMemberOptions(queryClient),
  );

  const leaveOrganizationMutation = useMutation(
    server.orgs.leaveOrganizationOptions(queryClient),
  );

  const updateMemberRoleMutation = useMutation(
    server.orgs.updateMemberRoleOptions(queryClient),
  );

  const onRemove = async () => {
    const shouldRemove = await confirm({
      title: "Remove member",
      description: `Are you sure you want to remove ${member.user.name} from the organization?`,
      action: "Yes, Remove",
      variant: "destructive",
      waitUntilAction: 2,
    });
    if (!shouldRemove) return;
    removeMemberMutation.mutate({
      memberIdOrEmail: member.id,
    });
  };

  const onLeave = async () => {
    const shouldLeave = await confirm({
      title: "Leave organization",
      description: `Are you sure you want to leave this organization?`,
      action: "Yes, Leave",
      variant: "destructive",
      waitUntilAction: 2,
    });
    if (!shouldLeave) return;
    leaveOrganizationMutation.mutate({
      organizationId: member.organizationId,
    });
    queryClient.removeQueries();
    navigate({ to: "/d/org" });
  };

  const onUpdateMemberRole = async () => {
    const shouldUpdateMemberRole = await confirm({
      title: "Change role",
      description: `Are you sure you want to change the role of ${member.user.name} to ${member.role === ORG_ROLES.MEMBER ? ORG_ROLES.ADMIN : ORG_ROLES.MEMBER} from ${member.role}?`,
      action: `Yes, Change to ${member.role === ORG_ROLES.MEMBER ? ORG_ROLES.ADMIN : ORG_ROLES.MEMBER}`,
      variant: "default",
    });
    if (!shouldUpdateMemberRole) return;
    updateMemberRoleMutation.mutate({
      memberId: member.id,
      role:
        member.role === ORG_ROLES.MEMBER ? ORG_ROLES.ADMIN : ORG_ROLES.MEMBER,
    });
  };

  const isCurrentUser = user.id === member.userId;
  const hasPermissions = getMyRoleQuery.data?.role !== ORG_ROLES.MEMBER;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        disabled={getMyRoleQuery.isLoading || member.role === ORG_ROLES.OWNER}
      >
        <Button variant="ghost" size="icon">
          <Icon name={ICONS_ENUM.OPTIONS} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem
          disabled={isCurrentUser || updateMemberRoleMutation.isPending}
          onClick={onUpdateMemberRole}
        >
          {updateMemberRoleMutation.isPending ? (
            <Spinner />
          ) : member.role === ORG_ROLES.MEMBER ? (
            <Icon name={ICONS_ENUM.ADMIN} />
          ) : (
            <Icon name={ICONS_ENUM.USER} />
          )}
          {member.role === ORG_ROLES.MEMBER
            ? `Promote to ${ORG_ROLES.ADMIN}`
            : `Demote to ${ORG_ROLES.MEMBER}`}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {!isCurrentUser ? (
          <DropdownMenuItem
            disabled={!hasPermissions || removeMemberMutation.isPending}
            variant="destructive"
            onClick={onRemove}
          >
            {removeMemberMutation.isPending ? (
              <Spinner />
            ) : (
              <Icon name={ICONS_ENUM.LOG_OUT} />
            )}
            Remove
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            variant="destructive"
            onClick={onLeave}
            disabled={leaveOrganizationMutation.isPending}
          >
            {leaveOrganizationMutation.isPending ? (
              <Spinner />
            ) : (
              <Icon name={ICONS_ENUM.LOG_OUT} />
            )}
            Leave
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TeamMembers };
