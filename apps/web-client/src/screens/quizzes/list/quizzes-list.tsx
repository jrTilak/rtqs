import { QuizCard } from "@/components/others/admin/quiz-card";
import { QueryState } from "@/components/ui/query-state";
import { Skeleton } from "@/components/ui/skeleton";
import { server } from "@/server/apis";

export const QuizzesList = () => {
  const quizzes = server.quizzes.useListQuizzes();

  return (
    <QueryState {...quizzes} isEmpty={quizzes.data?.length === 0}>
      <QueryState.Empty>No quizzes found, please add one.</QueryState.Empty>
      <QueryState.Loading>
        <Skeleton className="h-32" />
      </QueryState.Loading>
      <QueryState.Error />
      <QueryState.Data>
        <div className="flex flex-col gap-4">
          {quizzes.data?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </QueryState.Data>
    </QueryState>
  );
};
