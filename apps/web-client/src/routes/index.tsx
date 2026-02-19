import { Button } from "@/components/ui/button";
import { server } from "@/server/rest-api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useQuery(server.auth.querySessionOptions);
  return (
    <div>
      <Button>Hello world</Button>
      {JSON.stringify(session.data, null, 2)}
    </div>
  );
}
