import { confirm } from "@/components/ui/alert-dialog/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import { server } from "@/server/apis";
import type { QuizQuestion } from "@/server/apis/quiz-questions/types";
import { Trash } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  moduleId: string;
}

export const QuestionCard = ({ question, moduleId }: QuestionCardProps) => {
  const deleteQuestion = server.quizQuestions.useDeleteMany();

  const onDeleteQuestion = async () => {
    const should = await confirm({
      title: `Are you sure you want to delete this question?`,
      description: `This question '${question.question}' will be deleted and cannot be recovered.`,
      action: "Yes, Delete it!",
      variant: "destructive",
      waitUntillAction: 5,
    });
    if (!should) return;
    deleteQuestion.mutate({ ids: [question.id], moduleId });
  };

  return (
    <Card className="flex items-start justify-between gap-0 border shadow-none w-full py-2">
      <CardHeader className="w-full flex items-center justify-between flex-row px-4">
        <CardTitle className="flex-1">{question.question}</CardTitle>
        <div className="flex gap-1 opacity-0 transition-all group-hover/card:opacity-100 items-end justify-end">
          {/* <Button variant="ghost" size="icon">
            <Edit />
          </Button> */}

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={onDeleteQuestion}
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full px-4">
        <P>{question.answer}</P>
      </CardContent>
    </Card>
  );
};
