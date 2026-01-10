import { createFileRoute } from "@tanstack/react-router";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";
import { QuizLobby } from "@/screens/users/lobby";
import { usePreventNavigation } from "@/hooks/use-prevent-navigation";
import { useWakeLock } from "@/hooks/use-wake-lock";

export const Route = createFileRoute("/_users/lobby/$lobby-id")({
  component: Lobby,
});

function Lobby() {
  const { "lobby-id": lobbyId } = Route.useParams();
  const lobby = server.playQuiz.useFindJoinedLobby(lobbyId);

  usePreventNavigation({
    enabled: !import.meta.env.DEV,
  });
  useWakeLock(true);

  return (
    <QueryState {...lobby} isEmpty={!lobby.data}>
      <QueryState.Error />
      <QueryState.Loading />
      <QueryState.Empty />
      <QueryState.Data>
        <QuizLobby lobby={lobby.data!} />
      </QueryState.Data>
    </QueryState>
  );
}
