import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { UserWithRole } from "better-auth/plugins";
import { Badge } from "@/components/ui/badge";
import { ROLE } from "@/server/constants";
import { UserActions } from "./user-actions";

interface UsersTableProps {
  data: UserWithRole[];
}

export const UsersTable = ({ data }: UsersTableProps) => {
  return (
    <div className="rounded-xl border shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="pl-4">#{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className="font-normal"
                    variant={
                      user.role === ROLE.ADMIN ? "destructive" : "outline"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
