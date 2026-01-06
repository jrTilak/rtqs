import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Enter the Lobby Code
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please enter the lobby code to join the game
          </CardDescription>
        </CardHeader>

        {/* <CardContent className="flex justify-center">
          <StartLobbyDialog />
        </CardContent> */}

        <CardFooter className="justify-center text-xs text-muted-foreground">
          Make sure you have the correct lobby code
        </CardFooter>
      </Card>
    </div>
  );
}
