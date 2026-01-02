import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface QuestionContentProps {
  moduleName: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  moduleId: string;
  question: string;
  correctAnswer: string;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function QuestionContent({
  moduleName,
  currentQuestionIndex,
  totalQuestions,
  moduleId,
  question,
  correctAnswer,
  isLastQuestion,
  isFirstQuestion,
  onNext,
  onPrev,
}: QuestionContentProps) {
  return (
    <div className="flex-1">
      <Card className="rounded-2xl hover:shadow-lg border h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-xl font-semibold">
            <span>{moduleName}</span>
            <span className="text-sm text-muted-foreground font-normal">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Module {moduleId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <P className="text-lg text-foreground">Question</P>
            <div className="bg-muted/80 p-2 rounded-lg">
              <P>
                {question}
              </P>
            </div>
          </div>
          <div className="space-y pt-2">
            <P className="text-lg text-foreground">
              Correct Answer
            </P>
            <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500/50 p-2 rounded-lg">
              <P>
                {correctAnswer}
              </P>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end px-6 pt-6 border-t">
          <Button
            onClick={onPrev}
            disabled={isFirstQuestion}
            className="px-4 py-4"
          >
            {isLastQuestion ? "Previous" : "First"}
          </Button>
          <Button
            onClick={onNext}
            disabled={isLastQuestion}
            className="px-4 py-4 "
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
