import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/form/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ChevronRight } from "lucide-react";
import { server } from "@/server/apis";
import { alert } from "@/components/ui/alert-dialog/utils";
import { parseErrorMessage } from "@/lib/parse-error-message";

const enterLobbySchema = z.object({
  lobbyCode: z.string().length(4, "Lobby code must be 4 characters"),
});

export type EnterLobbyFormValues = z.infer<typeof enterLobbySchema>;

export function EnterLobbyForm() {
  const joinLobby = server.playQuiz.useJoinLobby();
  const navigate = useNavigate();
  const form = useForm<EnterLobbyFormValues>({
    // @ts-expect-error: todo fix
    resolver: zodResolver(enterLobbySchema),
    defaultValues: {
      lobbyCode: "",
    },
  });
  const onSubmit = async (values: EnterLobbyFormValues) => {
    try {
      const res = await joinLobby.mutateAsync(values.lobbyCode);
      navigate({
        to: "/lobby/$lobby-id",
        params: { "lobby-id": res.data.id },
      });
      form.reset();
    } catch (error) {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="lobbyCode"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormControl>
                <InputOTP
                  inputMode="text"
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup className="gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Join Lobby
          <ChevronRight />
        </Button>
      </form>
    </Form>
  );
}
