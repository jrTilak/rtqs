import { Illustration } from "@/components/illustration";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { H4, P } from "@/components/ui/typography";
import { LoginForm } from "@/screens/auth/login/login-form";
import { ILLUSTRATIONS_ENUM } from "@rtqs/plugin-loader";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
  component: Comp,
});

function Comp() {
  return (
    <div className="w-full h-dvh bg-linear-to-br from-background via-primary/5 to-background">
      <div className="h-full flex flex-col">
        <div className="bg-muted  border-b shadow-xs">
          <header className="flex container items-center gap-3 w-full p-4">
            <img
              src={import.meta.env.VITE_PUBLIC_APP_LOGO_URL}
              alt=""
              className="size-6"
            />
            <H4>{import.meta.env.VITE_PUBLIC_APP_NAME}</H4>
          </header>
        </div>

        <div className="grid gap-10 md:grid-cols-2 items-center justify-center max-w-5xl! mx-auto flex-1 pb-24 container">
          <Card className="flex justify-center max-w-sm">
            <CardHeader>
              <H4 className="text-center">
                Login to {import.meta.env.VITE_PUBLIC_APP_NAME}
              </H4>
            </CardHeader>
            <CardContent className="mt-5">
              <LoginForm />
            </CardContent>
            <CardFooter>
              <P className="text-center text-sm">
                For admins to manage quizzes; participants login via their org
                portal. <Link>Learn More.</Link>
              </P>
            </CardFooter>
          </Card>

          <div className="hidden md:flex items-center justify-center flex-1">
            <Illustration name={ILLUSTRATIONS_ENUM.LOGIN_PAGE_ILLUSTRATION} />
          </div>
        </div>
      </div>
    </div>
  );
}
