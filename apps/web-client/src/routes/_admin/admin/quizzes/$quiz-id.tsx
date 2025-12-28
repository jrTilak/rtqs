import { createFileRoute } from "@tanstack/react-router";
import { H2, H3, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { AddModuleDialog } from "@/screens/quizzes/detail/add-module-dialog";
import { ModulesList } from "@/screens/quizzes/detail/modules-list";

export const Route = createFileRoute("/_admin/admin/quizzes/$quiz-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "quiz-id": quizId } = Route.useParams();
  const navigate = useNavigate();

  const quiz = {
    id: quizId,
    name: "React Fundamentals Quiz",
    description: "Test your knowledge of React basics",
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate({ to: "/admin/quizzes" })}
      >
        <ArrowLeft />
        Back to Quizzes
      </Button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <H2>{quiz.name}</H2>
          {quiz.description && (
            <P className="text-muted-foreground">{quiz.description}</P>
          )}
        </div>
        <AddModuleDialog quizId={quizId} />
      </div>

      <div>
        <H3 className="text-lg font-semibold mb-4">Modules</H3>
        <ModulesList quizId={quizId} />
      </div>
    </div>
  );
}