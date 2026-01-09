import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { LobbyProps } from "..";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { H3, P } from "@/components/ui/typography";
import { KEYS } from "@/server/keys";

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

        {/* Winner Section */}
        {stats.winner && (
          <Card className="border-2 border-yellow-500/50 bg-yellow-500/5 dark:bg-yellow-500/10 flex flex-col justify-center items-center p-8 gap-4 shadow-lg shadow-yellow-500/10 w-full max-w-md">
            <Trophy className="size-16 text-yellow-500 animate-bounce" />
            <div className="text-center space-y-2">
              <P className="font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
                Fastest Correct Answer
              </P>
              <Avatar className="size-24 border-4 border-yellow-500 shadow-xl mx-auto">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stats.winner.name}`}
                />
                <AvatarFallback>{stats.winner.name[0]}</AvatarFallback>
              </Avatar>
              <H3 className="text-2xl font-bold">{stats.winner.name}</H3>
            </div>
          </Card>
        )}

        {stats.correctCount === 0 && !stats.winner && (
          <div className="text-center p-8">
            <H3 className="text-xl font-bold text-muted-foreground">
              No one got it right!
            </H3>
          </div>
        )}
      </div>
    </div>
  );
};
