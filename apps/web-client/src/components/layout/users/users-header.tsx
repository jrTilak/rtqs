import { Link } from "@tanstack/react-router";
import { UserNav } from "./user-nav";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function UsersHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="font-semibold">Home</span>
            </Link>
          </Button>
          {children}
        </div>
        <UserNav />
      </div>
    </header>
  );
}
