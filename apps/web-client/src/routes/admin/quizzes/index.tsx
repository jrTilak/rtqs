import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { QuizzesList } from "@/screens/admin/quizzes/list/quizzes-list";
import { AddQuizDialog } from "@/screens/admin/quizzes/list/add-quiz-dialog";

export const Route = createFileRoute("/admin/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center gap-6">
          <H2>Quizzes</H2>
          <AddQuizDialog />
        </div>
        <P>
          Quizzes are structured collections of modules, each containing a set
          of related questions designed to assess knowledge or understanding.
        </P>
      </div>
      <QuizzesList />
    </div>
  );
}
