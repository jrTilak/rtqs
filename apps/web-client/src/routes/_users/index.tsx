import { UsersHeader } from "@/components/layout/users/users-header";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnterLobbyForm } from "@/screens/users/join-lobby/enter-lobby-form";

export const Route = createFileRoute("/_users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <UsersHeader />
      <div className="flex flex-1 items-center justify-center bg-muted/40 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2 flex items-center justify-center flex-col">
            <img
              src={import.meta.env.VITE_PUBLIC_APP_LOGO_URL}
              className="size-24 object-contain object-center"
            />
            <CardTitle className="text-2xl font-bold">Join Lobby</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Please enter the lobby code to join the game.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <EnterLobbyForm />
          </CardContent>

          <CardFooter className="justify-center text-xs text-muted-foreground">
            Make sure you have the correct lobby code
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
