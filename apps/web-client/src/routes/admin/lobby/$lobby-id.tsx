import { QueryState } from "@/components/ui/query-state";
import { Timer } from "@/components/ui/timer";
import { server } from "@/server/apis";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/lobby/$lobby-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "lobby-id": lobbyId } = Route.useParams();
  const lobby = server.playQuiz.useGetLobby({ lobbyId });

  return (
    <QueryState {...lobby} isEmpty={!lobby.data}>
      <QueryState.Error />
      <QueryState.Empty />
      <QueryState.Loading />
      <QueryState.Data>
        <Timer futureTime={new Date(lobby.data?.waitInLobbyUntil!).getTime()} />
      </QueryState.Data>
    </QueryState>
  );
}
