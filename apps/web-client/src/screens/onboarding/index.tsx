import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { Label } from "@/components/ui/label";
import { H4, P } from "@/components/ui/typography";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { useState } from "react";
import { useUser } from "@/server/rest-api/auth";
import { CreateOrgForm } from "./create-org-form";
import { CopyButton } from "@/components/ui/copy-button";

const __TABS = {
  CREATE: "create",
  INVITE: "invite",
} as const;
type TabsType = (typeof __TABS)[keyof typeof __TABS];

export function OnboardingPage() {
  const user = useUser();
  const [activeTab, setActiveTab] = useState<TabsType>(__TABS.CREATE);
  return (
    <div className="flex items-center justify-center pb-20 h-dvh">
      <Card className="w-full max-w-2xl rounded-xl shadow-lg py-8">
        <Tabs
          onValueChange={(value) => setActiveTab(value as TabsType)}
          value={activeTab}
        >
          <CardHeader className="text-center">
            <header className="flex flex-col container items-center gap-3 w-full">
              <img
                src={import.meta.env.VITE_PUBLIC_APP_LOGO_URL}
                alt=""
                className="size-12"
              />
              <H4>Welcome Abroad</H4>
            </header>
            <TabsList
              className="grid grid-cols-2 mx-auto my-2 border "
              variant={"outline"}
            >
              <TabsTrigger value="create" className="px-4">
                Create organization
                <Icon name={ICONS_ENUM.CREATE_ORGANIZATION} />
              </TabsTrigger>
              <TabsTrigger value="invite" className="px-4">
                Get Invited
                <Icon name={ICONS_ENUM.INVITE_USER} />
              </TabsTrigger>
            </TabsList>
            <P>
              {activeTab === __TABS.CREATE
                ? "Create a new organization to get started."
                : "Ask your administrator to invite you to the organization."}
            </P>

            <div className="flex items-center gap-4 mx-auto mt-4 text-left">
              <UserAvatar size="lg" name={user.name} src={user.image} />

              <div>
                <P className="font-medium text-foreground">{user.name}</P>
                <P className="text-sm">@{user.username}</P>
              </div>
            </div>
          </CardHeader>

          <CardContent className="mt-6 ">
            <TabsContent value={__TABS.CREATE} className="space-y-6">
              <CreateOrgForm />
            </TabsContent>

            {/* INVITATION */}
            <TabsContent value="invite" className="space-y-6">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    readOnly
                    value={user.email}
                    afterContent={<CopyButton>{user.email}</CopyButton>}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    readOnly
                    value={user.username || ""}
                    afterContent={
                      <CopyButton>{user.username || ""}</CopyButton>
                    }
                  />
                </div>
              </div>
              <Button className="w-full">Show my invitations</Button>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
