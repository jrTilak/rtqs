"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QueryState } from "@/components/ui/query-state";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { UserAvatar } from "@/components/user-avatar";
import { server } from "@/server/rest-api";
import { useSetActiveSession, useUser } from "@/server/rest-api/auth";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function NavUser() {
  const { isMobile } = useSidebar();
  const sessions = useQuery(server.auth.listSessionsOptions);
  const { data } = useQuery(server.auth.querySessionOptions);
  const setActiveSession = useSetActiveSession();
  const revokeSession = server.auth.useRevokeSession();

  if (!data) return null;

  const { user: currentUser, session } = data;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={setActiveSession.isPending || revokeSession.isPending}
            asChild
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <UserAvatar src={currentUser.image} name={currentUser.name} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  @{currentUser.username}
                </span>
              </div>
              {setActiveSession.isPending || revokeSession.isPending ? (
                <Spinner className="ml-auto size-4" />
              ) : (
                <Icon name={ICONS_ENUM.OPTIONS} className="ml-auto size-4" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                className="p-0 font-normal gap-4"
                showIcon={false}
              >
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="h-8 w-8 rounded-lg">
                    <UserAvatar
                      src={currentUser.image}
                      name={currentUser.name}
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {currentUser.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
                <Icon
                  className="ml-auto mr-2"
                  name={ICONS_ENUM.CHEVRON_UP_DOWN}
                />
              </DropdownMenuSubTrigger>
              <DropdownMenuContent side="right" align="start" className="mb-12">
                <DropdownMenuLabel>
                  Your Accounts ({sessions.data?.length})
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <QueryState
                    {...sessions}
                    isEmpty={sessions.data?.length === 0}
                  >
                    <QueryState.Data>
                      {sessions.data?.map(({ user, session: { token } }) => (
                        <DropdownMenuItem
                          key={user.id}
                          disabled={user.id === currentUser.id}
                          onClick={() =>
                            setActiveSession.mutate({ sessionToken: token })
                          }
                          className="data-disabled:opacity-90"
                        >
                          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <div className="h-8 w-8 rounded-lg">
                              <UserAvatar src={user.image} name={user.name} />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-medium">
                                {user.name}
                              </span>
                              <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </QueryState.Data>
                    <QueryState.Error />
                    <QueryState.Loading mapLength={1}>
                      <Skeleton className="h-8" />
                    </QueryState.Loading>
                  </QueryState>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/auth/login">
                    Add another account
                    <Icon name={ICONS_ENUM.PLUS} className="ml-auto" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Account
                <Icon name={ICONS_ENUM.USER} className="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                revokeSession.mutate({ sessionToken: session.token })
              }
              variant="destructive"
            >
              Log out
              <Icon name={ICONS_ENUM.LOG_OUT} className="ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
