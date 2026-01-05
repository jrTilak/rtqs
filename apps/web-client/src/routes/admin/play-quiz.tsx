import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { PlayQuizzesList } from "@/screens/play-quizzes/play-quiz-list";

export const Route = createFileRoute("/admin/play-quiz")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <H2>Play Quizzes</H2>
          <P>Select a quiz below to create a lobby.</P>
        </div>
      </div>
      <PlayQuizzesList />
    </div>
  );
}