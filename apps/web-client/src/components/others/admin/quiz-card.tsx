import { alert, confirm } from "@/components/ui/alert-dialog/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { parseErrorMessage } from "@/lib/parse-error-message";
import { server } from "@/server/apis";
import type { Quiz } from "@/server/apis/quizzes/types";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Trash } from "lucide-react";

export const QuizCard = ({ quiz }: { quiz: Quiz }) => {
  const deleteQuiz = server.quizzes.useDeleteMany();
  const onDelete = async () => {
    const should = await confirm({
      title: "Are you sure you want to delete this quiz?",
      description:
        "After deleting this quiz, it along with its modules and questions will be deleted permanently.",
      waitUntillAction: 5,
      variant: "destructive",
      action: "Sure, Delete it!",
    });
    if (!should) return;
    try {
      await deleteQuiz.mutateAsync({ ids: [quiz.id] });
    } catch (error) {
      console.log("catch error", error);
      await alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };
  return (
    <Card
      className="gap-2 hover:border-primary border-transparent border relative"
      asChild
    >
      <Link to="/admin/quizzes/$quiz-id" params={{ "quiz-id": quiz.id }}>
        <div className="flex gap-2 items-center justify-center absolute top-1 right-1 opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-all w-fit">
          <Button
            isLoading={deleteQuiz.isPending}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            variant={"ghost"}
            size={"icon-sm"}
          >
            <Trash className="text-destructive" />
          </Button>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{quiz.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Text>{quiz.description || "No description provided"}</Text>
          <div className="flex items-center gap-2 text-xs ml-auto">
            <Calendar className="w-3 h-3" />
            <Text>
              Updated {formatDistanceToNow(quiz.updatedAt, { addSuffix: true })}
            </Text>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
