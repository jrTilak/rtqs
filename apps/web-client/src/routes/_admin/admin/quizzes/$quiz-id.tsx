import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { AddModuleDialog } from "@/screens/quizzes/quiz-modules/add-module-dialog";
import { ModulesList } from "@/screens/quizzes/quiz-modules/modules-list";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";

export const Route = createFileRoute("/_admin/admin/quizzes/$quiz-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "quiz-id": quizId } = Route.useParams();
  const navigate = useNavigate();
  const quiz = server.quizzes.useGetAQuiz(quizId);

  return (
    <div className="max-w-5xl w-full mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate({ to: "/admin/quizzes" })}
      >
        <ArrowLeft />
        Back
      </Button>

      <QueryState {...quiz} isEmpty={!quiz?.data}>
        <QueryState.Error />
        <QueryState.Loading />
        <QueryState.Empty />
        <QueryState.Data>
          <div className="flex justify-between items-start mb-6">
            <div>
              <H2>{quiz.data?.name}</H2>
              {quiz.data?.description && <P>{quiz.data?.description}</P>}
            </div>
            <AddModuleDialog quizId={quizId} />
          </div>

          <ModulesList quizId={quizId} />
        </QueryState.Data>
      </QueryState>
    </div>
  );
}
