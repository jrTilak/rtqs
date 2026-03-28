import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/d/org/$org-slug/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/org/$org-id"!</div>;
}
