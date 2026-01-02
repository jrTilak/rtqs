"use client";

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
} from "@/components/ui/form/form";
import { server } from "@/server/apis";
import { parseErrorMessage } from "@/lib/parse-error-message";
import { alert } from "@/components/ui/alert-dialog/utils";
import { Input } from "@/components/ui/form/input";

const formSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email" }),
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name must not be emtpy" }),
});

type FormSchema = z.infer<typeof formSchema>;
const DEFAULT_FORM_VALUES: FormSchema = {
  email: "",
  name: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const login = server.auth.useLoginByMagicLink();
  const onSubmit = async (data: FormSchema) => {
    try {
      await login.mutateAsync(data);
      alert({
        description:
          "A mail with login link has been sent to your mail, Please check your mailbox.",
        title: "Check Mail",
      });
      form.reset(DEFAULT_FORM_VALUES);
    } catch (error) {
      alert({
        description: parseErrorMessage(error),
        title: "Error",
        variant: "destructive",
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
              <FormLabel>Name*</FormLabel>
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
        <Button className="mt-2" isLoading={login.isPending}>
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
}
