import { H1, H3, P } from "@/components/ui/typography";
import { LoginForm } from "@/screens/auth/login/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Comp,
});

function Comp() {
  return (
    <div className="flex items-center justify-center lg:h-screen p-8 max-lg:mx-auto max-lg:py-12">
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-md">
        <div className="flex flex-col gap-2 text-center">
          <img
            src={import.meta.env.VITE_PUBLIC_APP_LOGO_URL}
            alt=""
            className="mx-auto w-24 object-center object-contain"
          />
          <H3 className="text-muted-foreground">Welcome to</H3>
          <H1>{import.meta.env.VITE_PUBLIC_APP_NAME}</H1>
          <P className="text-sm">{import.meta.env.VITE_PUBLIC_APP_DESC}</P>
        </div>
        <LoginForm />
        <P className="text-center text-sm">
          Only registered participants can take part in live quizzes, while
          administrators have access to manage quizzes, monitor activity, and
          control sessions.
        </P>
      </div>
    </div>
  );
}
