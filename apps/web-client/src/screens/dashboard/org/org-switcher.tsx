import { Icon } from "@/components/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/server/rest-api/auth/lib";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { OrgLogo } from "./org-logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { server } from "@/server/rest-api";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateOrgForm } from "./create-org-form";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryState } from "@/components/ui/query-state";
export function OrgSwitcher() {
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);

  const { isMobile } = useSidebar();
  const activeOrg = authClient.useActiveOrganization();
  const orgs = useQuery(server.orgs.listOptions);
  const navigate = useNavigate();
  const setActive = useMutation(server.orgs.setActiveOptions);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem className="border rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {activeOrg.isPending ? (
                <Skeleton className="h-10" />
              ) : (
                <SidebarMenuButton
                  disabled={setActive.isPending}
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-accent border flex aspect-square size-8 items-center justify-center rounded-md text-foreground">
                    <OrgLogo src={activeOrg.data?.logo} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeOrg.data?.name}
                    </span>
                    <span className="truncate text-xs">Free Plan</span>
                  </div>
                  {setActive.isPending ? (
                    <Icon
                      name={ICONS_ENUM.SPINNER}
                      className="ml-auto animate-spin"
                    />
                  ) : (
                    <Icon
                      name={ICONS_ENUM.CHEVRON_UP_DOWN}
                      className="ml-auto"
                    />
                  )}
                </SidebarMenuButton>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Organizations
              </DropdownMenuLabel>
              <QueryState {...orgs} isEmpty={orgs.data?.length === 0}>
                <QueryState.Data>
                  {orgs.data?.map((org) => (
                    <DropdownMenuItem
                      key={org.name}
                      onClick={() => {
                        setActive.mutate(
                          {
                            organizationId: org.id,
                            organizationSlug: org.slug,
                          },
                          {
                            onSuccess: (org) => {
                              navigate({
                                to: "/d/org/$org-slug",
                                params: { "org-slug": org.slug },
                              });
                            },
                          },
                        );
                      }}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md border text-foreground">
                        <OrgLogo src={org.logo} />
                      </div>
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                </QueryState.Data>
                <QueryState.Loading mapLength={2} className="gap-0">
                  <DropdownMenuItem className="px-2">
                    <Skeleton className="h-8 w-full" />
                  </DropdownMenuItem>
                </QueryState.Loading>
                <QueryState.Error />
              </QueryState>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsCreateOrgOpen(true);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-transparent">
                  <Icon
                    name={ICONS_ENUM.CREATE_ORGANIZATION}
                    className="size-4"
                  />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add new organization
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Dialog open={isCreateOrgOpen} onOpenChange={setIsCreateOrgOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new organization</DialogTitle>
          </DialogHeader>
          <CreateOrgForm
            onCreate={() => {
              setIsCreateOrgOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
