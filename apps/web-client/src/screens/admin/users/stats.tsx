import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconUserCircle, IconUsers, IconUserShield } from "@tabler/icons-react";

type Props = {
  totalUsers?: number;
  adminUsers?: number;
  participants?: number;
};

export const UserStats = ({ totalUsers, adminUsers, participants }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card size="sm" className="rounded-2xl">
        <CardHeader>
          <CardDescription className="text-xs flex items-center gap-2">
            <IconUsers className="size-4" />
            Total Users
          </CardDescription>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{totalUsers ?? "-"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            All registered users in the system
          </p>
        </CardContent>
      </Card>

      <Card size="sm" className="rounded-2xl">
        <CardHeader>
          <CardDescription className="text-xs flex items-center gap-2">
            <IconUserShield className="size-4" />
            Admin Users
          </CardDescription>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{adminUsers ?? "-"}</span>
            <span className="text-xs font-medium flex items-center gap-0.5 text-muted-foreground">
              {totalUsers && adminUsers
                ? Math.round((adminUsers / totalUsers) * 100)
                : 0}
              %
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Users with administrative privileges
          </p>
        </CardContent>
      </Card>

      <Card size="sm" className="rounded-2xl">
        <CardHeader>
          <CardDescription className="text-xs flex items-center gap-2">
            <IconUserCircle className="size-4" />
            Participants
          </CardDescription>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{participants ?? "-"}</span>
            <span className="text-xs font-medium flex items-center gap-0.5 text-muted-foreground">
              {totalUsers && participants
                ? Math.round((participants / totalUsers) * 100)
                : 0}
              %
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Standard participant users
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
