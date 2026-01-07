import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserStats } from "@/screens/admin/users/stats";
import { ROLE } from "@/server/constants";
import { server } from "@/server/apis";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/form/input";
import { QueryState } from "@/components/ui/query-state";
import { UsersTable } from "@/screens/admin/users/users-table";

export const Route = createFileRoute("/admin/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const usersQuery = server.users.useListUsers();
  const [globalFilter, setGlobalFilter] = useState("");

  const users = usersQuery.data || [];

  const totalUsers = users.length;
  const adminCount = users.filter((user) => user.role === ROLE.ADMIN).length;
  const participantsCount = totalUsers - adminCount;

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(globalFilter.toLowerCase())
    );
  });

  return (
    <div className="w-full space-y-6">
      <UserStats
        totalUsers={totalUsers}
        adminUsers={adminCount}
        participants={participantsCount}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-10"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </div>

      <QueryState {...usersQuery} isEmpty={filteredUsers?.length === 0}>
        <QueryState.Loading />
        <QueryState.Error />
        <QueryState.Data>
          <UsersTable data={filteredUsers} />
        </QueryState.Data>
      </QueryState>
    </div>
  );
}
