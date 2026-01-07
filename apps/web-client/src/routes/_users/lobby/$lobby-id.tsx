import { createFileRoute } from "@tanstack/react-router";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";

export const Route = createFileRoute("/_users/lobby/$lobby-id")({
  component: Lobby,
});

function Lobby() {
  const { "lobby-id": lobbyId } = Route.useParams();
  const lobby = server.playQuiz.useFindJoinedLobby(lobbyId);

  return (
    <div className="flex min-h-screen p-4">
      <QueryState {...lobby} isEmpty={!lobby.data}>
        <QueryState.Error />
        <QueryState.Loading />
        <QueryState.Empty />
        <QueryState.Data>
          <div>
            <h1>{lobby.data?.name}</h1>
          </div>
        </QueryState.Data>
      </QueryState>
    </div>
  );
}
