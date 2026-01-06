import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { QuizzesList } from "@/screens/quizzes/list/quizzes-list";
import { AddQuizDialog } from "@/screens/quizzes/list/add-quiz-dialog";

export const Route = createFileRoute("/admin/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <H2>Quizzes</H2>
          <P>Manage your quizzes here.</P>
        </div>
        <AddQuizDialog />
      </div>
      <QuizzesList />
    </div>
  );
}
