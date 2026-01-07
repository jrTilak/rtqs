import type { LobbyProps } from "..";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/form/label";

export const InQuiz = ({}: LobbyProps) => {
  // TODO: Get current question from lobby or a separate query
  const question = "What is the capital of France?"; // Mock question

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full py-8">
      <Card>
        <CardHeader>
          <CardTitle className="select-none text-xl md:text-2xl leading-relaxed">
            {question}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="answer">Your Answer</Label>
          <Textarea
            id="answer"
            placeholder="Type your answer here..."
            className="min-h-37.5 resize-none text-lg"
            onPaste={(e) => {
              e.preventDefault();
              alert("Pasting is not allowed!");
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button size="lg" className="w-full">
            Submit Answer
          </Button>
        </div>
      </div>
    </div>
  );
};
