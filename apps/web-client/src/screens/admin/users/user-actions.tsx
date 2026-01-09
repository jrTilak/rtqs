import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Shield, MoreVertical } from "lucide-react";
import type { UserWithRole } from "better-auth/plugins";
import { ROLE } from "@/server/constants";
import { server } from "@/server/apis";
import { confirm } from "@/components/ui/alert-dialog/utils";

interface UserActionsProps {
  user: UserWithRole;
}

export const UserActions = ({ user }: UserActionsProps) => {
  const changeRole = server.users.useChangeRole();

  const onChangeRole = async (role: string) => {
    const should = await confirm({
      title: "Change Role",
      description: `Are you sure you want to change the role of ${
        user.email
      } to ${role.toUpperCase()}?`,
      variant: "destructive",
      waitUntillAction: 5,
    });

    if (!should) return;

    changeRole.mutate([
      {
        role: role as any,
        userId: user.id,
      },
    ]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button isLoading={changeRole.isPending} variant="ghost" size={"icon"}>
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuItem disabled>
          <Pencil /> Edit User
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onChangeRole(user.role === ROLE.ADMIN ? ROLE.USER : ROLE.ADMIN)
          }
        >
          <Shield />
          {user.role === ROLE.ADMIN ? "Revoke Admin" : "Grant Admin"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="text-destructive focus:text-destructive"
        >
          <Trash /> Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
