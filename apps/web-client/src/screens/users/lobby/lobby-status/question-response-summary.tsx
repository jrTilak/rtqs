import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { LobbyProps } from "..";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { H3, P } from "@/components/ui/typography";
import { KEYS } from "@/server/keys";
import { ScrollArea } from "@/components/ui/scroll-area";

function formatDuration(ms: number) {
  if (ms < 0) return "00:00:00:000";
  const hh = Math.floor(ms / 3600000);
  const mm = Math.floor((ms % 3600000) / 60000);
  const ss = Math.floor((ms % 60000) / 1000);
  const mss = ms % 1000;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(
    2,
    "0"
  )}:${String(ss).padStart(2, "0")}:${String(mss).padStart(3, "0")}`;
}

export const QuestionResponseSummary = ({ lobby }: LobbyProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: KEYS.playQuiz.findJoinedLobby(lobby.id),
    });
  }, [lobby.id, queryClient]);

  // Cast lobby to any to access new properties we will add to backend
  const extendedLobby = lobby as any;
  const lastResponse = extendedLobby.lastResponse;
  const stats = extendedLobby.questionStats || {
    correctCount: 0,
    winner: null,
  };
  const correctAnswer = lobby.currentQuestion?.answer || "---";

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-8 h-full">
      {/* Correct Answer Section */}
      <div className="text-center space-y-2">
        <P className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
          Correct Answer
        </P>
        <H3 className="text-3xl font-bold text-success text-green-600 dark:text-green-400">
          {correctAnswer}
        </H3>
      </div>

      <div className="flex flex-col gap-6 flex-1 min-h-0 items-center justify-center">
        {/* User Status */}
        {lastResponse ? (
          <Card
            className={cn(
              "border-2 p-8 text-center",
              lastResponse.isCorrect
                ? "border-green-500 bg-green-500/10"
                : "border-red-500 bg-red-500/10"
            )}
          >
            <H3 className="text-2xl font-bold mb-2">
              {lastResponse.isCorrect ? "Correct!" : "Incorrect"}
            </H3>
            <P>Your answer: {lastResponse.answer}</P>
          </Card>
        ) : (
          <Card className="border-2 p-8 text-center border-muted">
            <H3 className="text-2xl font-bold mb-2">You didn't answer</H3>
          </Card>
        )}

        {/* Responses List */}
        <div className="w-full max-w-xl">
          <H3 className="text-xl font-bold mb-4">Responses</H3>
          <ScrollArea className="h-[300px] w-full border rounded-md bg-card">
            <div className="divide-y">
              {extendedLobby.allResponses?.map((resp: any, i: number) => {
                const startedAt = extendedLobby.currentQuestionStartedAt;
                const duration = startedAt
                  ? new Date(resp.createdAt).getTime() -
                    new Date(startedAt).getTime()
                  : null;
                return (
                  <div
                    key={resp.id}
                    className={cn(
                      "p-4 flex justify-between items-center opacity-70 transition-colors hover:bg-muted/50",
                      resp.isCorrect && "opacity-100 bg-green-500/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-muted-foreground w-6 text-right">
                        #{i + 1}
                      </span>
                      <Avatar className="size-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${resp.player.name}`}
                        />
                        <AvatarFallback>{resp.player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <P className="font-medium text-sm">
                          {resp.player.name}
                        </P>
                        <P className="text-xs text-muted-foreground">
                          {resp.answer}
                        </P>
                      </div>
                    </div>
                    <div className="text-right">
                      {resp.isCorrect && (
                        <span className="text-green-600 font-bold text-xs uppercase px-2">
                          Correct
                        </span>
                      )}
                      {duration !== null && (
                        <P className="text-xs font-mono text-muted-foreground">
                          {formatDuration(duration)}
                        </P>
                      )}
                    </div>
                  </div>
                );
              })}
              {!extendedLobby.allResponses?.length && (
                <div className="p-8 text-center text-muted-foreground">
                  No responses yet.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
