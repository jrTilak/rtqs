import { createFileRoute } from '@tanstack/react-router'
import { Timer } from '@/components/ui/timer/timer';


export const Route = createFileRoute('/_users/lobby/$lobby-id')({
  component: Lobby,
})

function Lobby() {
  //  const { "lobby-id":lobbyId } = Route.useParams();

  return (
    <div className="flex min-h-screen py-16 justify-center  px-4">
       <Timer />
    </div>
  );
}
