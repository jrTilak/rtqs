import { useState } from "react";
import { Timer } from "@/components/ui/timer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LobbyProps } from "..";
import { useGetLobbyResponses } from "@/server/apis/play-quiz/hooks";
import {
  useEvaluateQuestion,
  useNextQuestion,
} from "@/server/ws/play-quiz/hooks";
import { alert } from "@/components/ui/alert-dialog/utils";

export const ManageLobbyQuestions = ({ lobby }: LobbyProps) => {
  const [selectedResponseId, setSelectedResponseId] = useState<string | null>(
    null
  );
  const { data: responses } = useGetLobbyResponses(lobby.id);
  const evaluateQuestion = useEvaluateQuestion();
  const nextQuestion = useNextQuestion();

  const handleMarkCorrect = () => {
    const selected = responses?.find((a) => a.player.id === selectedResponseId);
    if (selected) {
      evaluateQuestion.mutate(
        {
          lobbyId: lobby.id,
          correctAnswerText: selected.answer,
        },
        {
          onSuccess: () => {
            // Status update should trigger UI change from parent
          },
          onError: (err: any) => {
            alert({
              title: "Error",
              description: err.message,
            });
          },
        }
      );
    }
  };

  const handleNoCorrect = () => {
    evaluateQuestion.mutate(
      {
        lobbyId: lobby.id,
      },
      {
        onError: (err: any) => {
          alert({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  };

  const handleNextQuestion = () => {
    nextQuestion.mutate(
      {
        lobbyId: lobby.id,
      },
      {
        onError: (err: any) => {
          alert({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  };

  return (
    <div className="flex justify-center gap-6 w-full">
      <div className="flex gap-6 max-w-7xl w-full">
        {/* Question Content */}
        <div className="flex-1">
          <Card className="hover:shadow-lg border h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold">
                    Module:{" "}
                    {lobby.currentModule?.name
                      ? `#${lobby.currentModule?.index} ${lobby.currentModule?.name}`
                      : "---"}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Timer
                    futureTime={new Date(lobby.waitUntil).getTime()}
                    className="text-lg font-bold tracking-tight text-foreground"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <P>Question</P>
                  <div className="bg-muted/80 p-4 rounded-md">
                    <P className="text-lg">
                      #{lobby.currentQuestion?.index ?? "-"}{" "}
                      {lobby.currentQuestion?.question ?? "---"}
                    </P>
                  </div>
                </div>

                <div className="space-y-2">
                  <P>Correct Answer</P>
                  <div className="bg-muted/80 p-4 rounded-md border border-green-500">
                    <P className="text-lg">
                      {lobby.currentQuestion?.answer ?? "--- "}
                    </P>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="min-w-[400px] shrink-0">
          <Card className="hover:shadow-lg border sticky top-2 max-h-[90vh] flex flex-col">
            <CardHeader>
              <CardTitle>Responses ({responses?.length || 0})</CardTitle>
            </CardHeader>

            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 pb-4">
                {responses?.map((answer: any) => {
                  const isSelected = selectedResponseId === answer.player.id;

                  return (
                    <div
                      key={answer.player.id}
                      onClick={() => setSelectedResponseId(answer.player.id)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/5 border-primary"
                          : "bg-background border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {answer.player.name || answer.player.email}
                        </span>
                      </div>
                      <P className="text-base">{answer.answer}</P>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <CardFooter className="p-4 border-t bg-muted/50 flex flex-col gap-2">
              {lobby.status === "QUESTION_RESPONSE_SUMMARY" ? (
                <Button
                  className="w-full"
                  disabled={nextQuestion.isPending}
                  onClick={handleNextQuestion}
                >
                  {nextQuestion.isPending ? "Loading..." : "Next Question"}
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full"
                    disabled={!selectedResponseId || evaluateQuestion.isPending}
                    onClick={handleMarkCorrect}
                  >
                    {evaluateQuestion.isPending && selectedResponseId
                      ? "Marking..."
                      : "Mark as Correct"}
                  </Button>
                  <Button
                    className="w-full"
                    variant={"outline"}
                    disabled={evaluateQuestion.isPending}
                    onClick={handleNoCorrect}
                  >
                    No Correct Answer
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
