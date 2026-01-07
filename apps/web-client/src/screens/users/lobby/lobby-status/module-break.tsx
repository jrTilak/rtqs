import { Timer } from "@/components/ui/timer";
import type { LobbyProps } from "..";
import { H3, P } from "@/components/ui/typography";
import { Coffee } from "lucide-react";

export const ModuleBreak = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-muted rounded-full">
          <Coffee className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <H3 className="font-medium text-foreground">Module Break</H3>
          <P className="text-muted-foreground">
            Take a breath! Next module starting in
          </P>
        </div>
      </div>

      <Timer
        futureTime={new Date(lobby.waitInLobbyUntil).getTime()}
        showHH={false}
        className="text-6xl md:text-8xl font-bold text-primary font-mono tracking-tight"
      />

      <div className="flex flex-col items-center gap-2 max-w-sm text-center">
        <P className="text-sm text-muted-foreground">
          Review your strategy and get ready for the next set of questions.
        </P>
      </div>
    </div>
  );
};
