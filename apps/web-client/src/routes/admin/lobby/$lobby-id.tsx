import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbTitle } from "@/components/layout/admin/breadcrumb";
import { QueryState } from "@/components/ui/query-state";
import { usePreventNavigation } from "@/hooks/use-prevent-navigation";
import { useWakeLock } from "@/hooks/use-wake-lock";
import { server } from "@/server/apis";
import { LobbyPage } from "@/screens/admin/lobby";

export const Route = createFileRoute("/admin/lobby/$lobby-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "lobby-id": lobbyId } = Route.useParams();
  const lobby = server.playQuiz.useGetLobby(lobbyId);

  usePreventNavigation({
    enabled: import.meta.env.DEV,
  });
  useWakeLock(true);

  return (
    <>
      <BreadcrumbTitle items={["Lobbies", lobby.data?.name || "---"]} />
      <QueryState {...lobby} isEmpty={!lobby.data}>
        <QueryState.Error />
        <QueryState.Empty />
        <QueryState.Loading />
        <QueryState.Data>
          <LobbyPage lobby={lobby.data!} />
        </QueryState.Data>
      </QueryState>
    </>
  );
}
