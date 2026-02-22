import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { server } from "@/server/apis";
import { Input } from "@/components/ui/input";

import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { LastLoginBadge } from "./last-login-badge";
import { authClient } from "@/lib/auth";
import { server } from "@/server/rest-api";
import { alert, confirm } from "@/components/ui/confirm-dialog";
import { useNavigate } from "@tanstack/react-router";
import { parseErrorMessage } from "@/lib/parse-error-message";

const formSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email" }),
  name: z.string({ message: "Name is required" }).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
const DEFAULT_FORM_VALUES: FormSchema = {
  email: "",
  name: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const login = server.auth.useMagicLinkLogin();
  const onSubmit = async (data: FormSchema) => {
    try {
      await login.mutateAsync(data);
      alert({
        description:
          "A login link has been sent to your email address. Please check your inbox.",
        title: "Check your email",
        action: "Ok, got it",
      });
    } catch (err) {
      alert({
        title: "Error!!",
        description: parseErrorMessage(err),
        variant: "destructive",
        action: "Ok, got it",
      });
    }
  };

  const googleLogin = server.auth.useGoogleLogin();
  const anonymousLogin = server.auth.useAnonymousLogin();
  const onAnonymousLogin = async () => {
    const should = await confirm({
      title: "Continue as Guest?",
      description:
        "By continuing as a guest, you may lose access to your data if you clear your cookies or switch devices.",
      action: "Continue as Guest",
      variant: "destructive",
      cancel: "Cancel",
    });
    if (!should) return;
    try {
      await anonymousLogin.mutateAsync();
      navigate({ to: "/" });
    } catch (err) {
      alert({
        title: "Error!!",
        description: parseErrorMessage(err),
        variant: "destructive",
        action: "Ok, got it",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-4", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input {...field} type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={login.isPending}
          size={"lg"}
          className="mt-2 relative"
        >
          Get Login Link <Icon name={ICONS_ENUM.LOGIN_LINK} />
          {authClient.isLastUsedLoginMethod("magic-link") && <LastLoginBadge />}
        </Button>
      </form>
      <div className="flex items-center justify-center w-full gap-2 mt-4">
        <Button
          isLoading={googleLogin.isPending}
          onClick={() => googleLogin.mutate()}
          variant={"outline"}
          className="flex-1 relative"
        >
          <Icon name={ICONS_ENUM.GOOGLE} />
          with Google
          {authClient.isLastUsedLoginMethod("google") && <LastLoginBadge />}
        </Button>
        <Button
          isLoading={anonymousLogin.isPending}
          onClick={onAnonymousLogin}
          variant={"outline"}
          className="flex-1 relative"
        >
          <Icon name={ICONS_ENUM.ANONYMOUS_AVATAR} />
          as Guest
          {authClient.isLastUsedLoginMethod("anonymous") && <LastLoginBadge />}
        </Button>
      </div>
    </Form>
  );
}
