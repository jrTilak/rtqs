import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/error")({
  component: RouteComponent,
  validateSearch: z.object({
    "error-code": z.string().optional(),
  }),
});

function RouteComponent() {
  return <div>Hello "/error"!</div>;
}
