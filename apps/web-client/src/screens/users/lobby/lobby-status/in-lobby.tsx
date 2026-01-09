import { Timer } from "@/components/ui/timer";
import { Spinner } from "@/components/ui/spinner";
import type { LobbyProps } from "..";
import { P } from "@/components/ui/typography";

export const InLobby = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-12">
      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground uppercase text-sm tracking-widest font-medium">
          Quiz Starts In
        </span>
        <Timer
          futureTime={new Date(lobby.waitUntil).getTime()}
          className="text-7xl sm:text-8xl font-bold tracking-tight text-foreground"
        />
      </div>

      <div className="flex flex-col items-center gap-4 text-center animate-pulse">
        <Spinner size="xl" className="text-primary" />
        <div className="space-y-1">
          <P className="text-lg font-medium text-foreground">
            Waiting for other players...
          </P>
          <P className="text-sm">Please be patient, the quiz will start soon</P>
        </div>
      </div>
    </div>
  );
};
