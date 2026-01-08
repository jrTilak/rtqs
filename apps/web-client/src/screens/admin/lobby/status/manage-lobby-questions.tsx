import { useState } from "react";
import { Timer } from "@/components/ui/timer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LobbyProps } from "..";

const mockData = {
  moduleId: "1",
  name: "General Knowledge",
  questions: [
    {
      questionId: "1",
      content: "What is the capital of France?",
      realAnswer: "Paris",
      answers: [
        { userId: "1", userName: "Alice", answer: "Paris" },
        { userId: "2", userName: "Bob", answer: "London" },
        { userId: "3", userName: "Charlie", answer: "Paris" },
      ],
    },
    {
      questionId: "2",
      content: "What is 2 + 2?",
      realAnswer: "4",
      answers: [
        { userId: "1", userName: "Alice", answer: "4" },
        { userId: "2", userName: "Bob", answer: "5" },
      ],
    },
  ],
};

export const ManageLobbyQuestions = ({ lobby }: LobbyProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedResponseId, setSelectedResponseId] = useState<string | null>(
    null
  );
  const [markedCorrectAnswer, setMarkedCorrectAnswer] = useState<string | null>(
    null
  );

  const currentQuestion = mockData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockData.questions.length - 1;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedResponseId(null);
      setMarkedCorrectAnswer(null);
    }
  };

  const handleMarkCorrect = () => {
    const selected = currentQuestion.answers.find(
      (a) => a.userId === selectedResponseId
    );
    if (selected) {
      setMarkedCorrectAnswer(selected.answer);
    }
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
                  <CardTitle className="text-xl font-semibold">
                    Module:
                    {lobby.currentModule?.name
                      ? `${lobby.currentModule?.name} #${lobby.currentModule?.index}`
                      : "---"}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of{" "}
                    {mockData.questions.length}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Time Remaining:
                  </span>
                  <Timer
                    futureTime={new Date(Date.now() + 60000).getTime()}
                    className="text-2xl font-bold tracking-tight text-foreground"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <P className="text-lg text-foreground font-medium">
                    Question
                  </P>
                  <div className="bg-muted/80 p-4 rounded-lg">
                    <P className="text-xl">{currentQuestion.content}</P>
                  </div>
                </div>

                <div className="space-y-2">
                  <P className="text-lg text-foreground font-medium">
                    Correct Answer
                  </P>
                  <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500/50 p-4 rounded-lg">
                    <P className="text-xl">{currentQuestion.realAnswer}</P>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end px-6 pt-6 border-t mt-auto">
              <Button onClick={handleNext} disabled={isLastQuestion}>
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* User Answers Sidebar */}
        <div className="min-w-[400px] shrink-0">
          <Card className="rounded-2xl hover:shadow-lg border sticky top-2 max-h-[90vh] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                User Answers
              </CardTitle>
              <CardDescription className="text-sm">
                {currentQuestion.answers.length} responses
              </CardDescription>
            </CardHeader>

            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 pb-4">
                {currentQuestion.answers.map((answer) => {
                  const isCorrect = markedCorrectAnswer === answer.answer;
                  const isSelected = selectedResponseId === answer.userId;

                  return (
                    <div
                      key={answer.userId}
                      onClick={() => setSelectedResponseId(answer.userId)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isCorrect
                          ? "bg-green-50 dark:bg-green-950/20 border-green-500"
                          : isSelected
                          ? "bg-primary/5 border-primary"
                          : "bg-background border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {answer.userName}
                        </span>
                        {isCorrect && (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            Correct
                          </Badge>
                        )}
                      </div>
                      <P className="text-base">{answer.answer}</P>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <CardFooter className="p-4 border-t bg-muted/50">
              <Button
                className="w-full"
                disabled={!selectedResponseId}
                onClick={handleMarkCorrect}
              >
                Mark as Correct
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
