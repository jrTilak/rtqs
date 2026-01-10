import { UsersHeader } from "@/components/layout/users/users-header";
import { LobbyStatus } from "./lobby-status";
import type { FindJoinedLobbyResponse } from "@/server/apis/play-quiz";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSocket } from "@/server/ws/hooks";
import { MESSAGES } from "@/server/ws/play-quiz/messages";
import { useJoinLobbyRoom } from "@/server/ws/play-quiz/hooks";
import { useEffect } from "react";

export type LobbyProps = {
  lobby: FindJoinedLobbyResponse["data"];
};
export const QuizLobby = ({ lobby }: LobbyProps) => {
  const { isConnected } = useSocket({
    events: [MESSAGES.LOBBY_UPDATED],
  });

  const joinLobbyRoom = useJoinLobbyRoom(
    {
      lobbyId: lobby.id,
    },
    {
      enabled: isConnected,
    }
  );

  useEffect(() => {
    if (!joinLobbyRoom.isSuccess) {
      joinLobbyRoom.mutate();
    }
  }, [joinLobbyRoom.isSuccess]);

  return (
    <div className="flex flex-col h-screen">
      <UsersHeader>
        <span className="text-muted-foreground/40">|</span>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>{lobby.quiz.name}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lobby.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </UsersHeader>
      <div className="px-6 flex-1 mb-24">
        <LobbyStatus lobby={lobby} />
      </div>
    </div>
  );
};
