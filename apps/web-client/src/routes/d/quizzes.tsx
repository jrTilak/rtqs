import { createFileRoute } from "@tanstack/react-router";
import { QuizzesPage } from "@/screens/dashboard/quizzes/quizzes-page";

export const Route = createFileRoute("/d/quizzes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <QuizzesPage />;
}
