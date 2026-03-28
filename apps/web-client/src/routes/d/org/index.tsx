import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/d/org/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/d/org/"!</div>;
}
