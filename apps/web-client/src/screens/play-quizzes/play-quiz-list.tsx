import { QueryState } from "@/components/ui/query-state";
import { Skeleton } from "@/components/ui/skeleton";
import { server } from "@/server/apis";
import { QuizCard } from "./quiz-card";

export const PlayQuizzesList = () => {
  const quizzes = server.quizzes.useListQuizzes();

  return (
    <QueryState {...quizzes} isEmpty={quizzes.data?.length === 0}>
      <QueryState.Empty>No quizzes found, please add one.</QueryState.Empty>
      <QueryState.Loading>
        <Skeleton className="h-32" />
      </QueryState.Loading>
      <QueryState.Error />
      <QueryState.Data>
        {
          quizzes.data?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))
        }
      </QueryState.Data>
    </QueryState>
  );
};