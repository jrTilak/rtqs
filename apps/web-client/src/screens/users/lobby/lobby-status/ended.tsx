import type { LobbyProps } from "..";
import { Button } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Ended = ({}: LobbyProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 py-12 text-center">
      <div className="space-y-4">
        <H3>Quiz Ended</H3>
        <P className="text-muted-foreground max-w-md mx-auto">
          The quiz has been officially ended by the administrator. Thank you for
          participating!
        </P>
      </div>

      <Link to="/">
        <Button size="lg" className="gap-2">
          <Home className="size-4" />
          Go back to Home
        </Button>
      </Link>
    </div>
  );
};
