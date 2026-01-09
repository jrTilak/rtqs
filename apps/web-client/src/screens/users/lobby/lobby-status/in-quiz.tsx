import type { LobbyProps } from "..";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/form/label";
import { H2 } from "@/components/ui/typography";
import { useState, useCallback } from "react";
import { useSubmitAnswer } from "@/server/ws/play-quiz/hooks";
import { alert } from "@/components/ui/alert-dialog/utils";
import { Timer } from "@/components/ui/timer";
import { Clock } from "lucide-react";

export const InQuiz = ({ lobby }: LobbyProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitAnswer = useSubmitAnswer();

  // 2 minutes from when the question started
  const targetTime = new Date(lobby.waitUntil).getTime() + 120 * 1000;

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;

    // Prevent submitting empty answer manually, allowing auto-submit even if empty (optional, but safer to stick to non-empty if backend validates)
    // Assuming backend might reject empty answer, avoiding manual empty submit is UI logic.
    // Auto-submit calling this with empty answer might trigger sending empty string.

    submitAnswer.mutate(
      {
        lobbyId: lobby.id,
        answer,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          alert({
            title: "Success",
            description: "Answer submitted successfully!",
          });
        },
        onError: (err) => {
          alert({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  }, [lobby.id, answer, isSubmitted, submitAnswer]);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full py-8">
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
          <Clock className="w-5 h-5 text-primary" />
          <Timer
            futureTime={targetTime}
            showHH={false}
            className="text-xl font-bold font-mono tracking-wider"
          />
        </div>
      </div>

      <Card className="py-2! px-4!">
        <H2 className="select-none text-xl md:text-2xl leading-relaxed">
          <span className="text-muted-foreground text-sm">
            {" "}
            #{lobby.currentQuestion.index}
          </span>{" "}
          {lobby.currentQuestion.question}
        </H2>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="answer">Your Answer*</Label>
          <Textarea
            id="answer"
            placeholder="Type your answer here..."
            className="min-h-37.5 resize-none text-base disabled:opacity-80"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSubmitted}
            onPaste={(e) => {
              e.preventDefault();
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button
            disabled={
              answer.trim() === "" || submitAnswer.isPending || isSubmitted
            }
            size="lg"
            className="w-full"
            onClick={() => handleSubmit()}
          >
            {isSubmitted
              ? "Submitted"
              : submitAnswer.isPending
              ? "Submitting..."
              : "Submit Answer"}
          </Button>
        </div>
      </div>
    </div>
  );
};
