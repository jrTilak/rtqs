import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Invitations } from "./invitations";
import { TeamMembers } from "./team-members";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { server } from "@/server/rest-api";

const TAB_VALUES = {
  MEMBERS: "members",
  INVITATIONS: "invitations",
} as const;

const OrgMembers = () => {
  const [tabValue, setTabValue] = useState<string>(TAB_VALUES.MEMBERS);
  const listMembersQuery = useQuery(server.orgs.listMembersOptions());
  const listInvitationsQuery = useQuery(server.orgs.listInvitationsOptions());

  return (
    <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
      <TabsList
        variant="underline"
        className="text-sm flex justify-between items-center w-full"
      >
        <div>
          <TabsTrigger value={TAB_VALUES.MEMBERS}>
            Team Members{" "}
            {Boolean(listMembersQuery.data?.total) &&
              `(${listMembersQuery.data?.total})`}
          </TabsTrigger>
          <TabsTrigger value={TAB_VALUES.INVITATIONS}>
            Invitations
            {(() => {
              const pendingInvitations = listInvitationsQuery.data?.filter(
                (invitation) => invitation.status === "pending",
              );
              if (pendingInvitations?.length) {
                return ` (${pendingInvitations.length})`;
              }
              return null;
            })()}
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value={TAB_VALUES.MEMBERS} className="space-y-3">
        <TeamMembers />
      </TabsContent>
      <TabsContent value={TAB_VALUES.INVITATIONS} className="mt-0 space-y-3">
        <Invitations />
      </TabsContent>
    </Tabs>
  );
};

export { OrgMembers };
