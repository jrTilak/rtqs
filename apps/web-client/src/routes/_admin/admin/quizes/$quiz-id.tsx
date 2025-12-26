import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/quizes/$quiz-id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_admin/admin/quizes/$quiz-id"!</div>;
}
