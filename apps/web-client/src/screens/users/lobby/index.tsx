import { LobbyStatus } from "./lobby-status";
import type { FindJoinedLobbyResponse } from "@/server/apis/play-quiz";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type LobbyProps = {
  lobby: FindJoinedLobbyResponse["data"];
};
export const QuizLobby = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex flex-col gap-4 h-screen">
      <header className="border-b px-6 py-3 bg-muted">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>{lobby.quiz.name}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lobby.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="px-6 flex items-center justify-center flex-1 mb-24">
        <LobbyStatus lobby={lobby} />
      </div>
    </div>
  );
};
