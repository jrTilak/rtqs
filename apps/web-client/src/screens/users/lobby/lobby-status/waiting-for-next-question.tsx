import { Timer } from "@/components/ui/timer";
import type { LobbyProps } from "..";
import { H3, P } from "@/components/ui/typography";

export const WaitingForNextQuestion = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center text-center">
        <H3 className="font-medium text-foreground">Get Ready!</H3>
        <P>Next question will reveal in</P>
      </div>

      <Timer
        futureTime={new Date(lobby.waitInLobbyUntil).getTime()}
        showHH={false}
        className="text-8xl md:text-9xl font-bold text-destructive"
      />

      <div className="flex flex-col items-center gap-2">
        <P className="text-sm ">Be patient...</P>
      </div>
    </div>
  );
};
