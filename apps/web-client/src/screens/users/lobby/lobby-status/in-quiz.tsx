import type { LobbyProps } from "..";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/form/label";
import { H2 } from "@/components/ui/typography";
import { useState } from "react";

export const InQuiz = ({ lobby }: LobbyProps) => {
  const [answer, setAnswer] = useState("");
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full py-8">
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
            className="min-h-37.5 resize-none text-base"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onPaste={(e) => {
              e.preventDefault();
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={answer.trim() === ""} size="lg" className="w-full">
            Submit Answer
          </Button>
        </div>
      </div>
    </div>
  );
};
