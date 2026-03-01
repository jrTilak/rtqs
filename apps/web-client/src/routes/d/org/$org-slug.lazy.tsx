import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/d/org/$org-slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/org/$org-id"!</div>;
}
