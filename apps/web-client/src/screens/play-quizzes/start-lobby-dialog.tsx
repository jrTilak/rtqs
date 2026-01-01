import { alert } from "@/components/ui/alert-dialog/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/form/input-otp";
import { parseErrorMessage } from "@/lib/parse-error-message";
import { ws } from "@/server/ws";
import { createLobby } from "@/server/ws/play-quiz/commands";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Play } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const startLobbySchema = z.object({
  name: z.string().min(1, "Player name is required"),
  code: z.string().length(4, "Lobby code must be 4 characters"),
  waitUntil: z.coerce.number(),
});

type StartLobbyFormValues = z.infer<typeof startLobbySchema>;

type Props = {
  quizId: string;
};

export const StartLobbyDialog = ({ quizId }: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const createLobby = ws.playQuiz.useCreateLobby();
  const form = useForm<StartLobbyFormValues>({
    resolver: zodResolver(startLobbySchema),
    defaultValues: {
      name: "",
      code: "",
      waitUntil: 10,
    },
  });

  const onSubmit = async (data: StartLobbyFormValues) => {
    try {
      const lobby = await createLobby.mutateAsync({
        code: data.code,
        name: data.name,
        waitUntil: new Date(Date.now() + data.waitUntil * 60 * 1000).toDateString(),
        quizId
      });
      navigate({
        to: "/admin/lobby/$lobby-id",
        params: { "lobby-id": lobby.id },
      })
      setOpen(false);
    } catch (error) {
      await alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive"
      })
    }

  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Start Lobby
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Start Lobby</DialogTitle>
          <DialogDescription>
            After starting the lobby, all the participants can join using the lobby code.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lobby Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Lobby 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waitUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waiting Time (minutes)*</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lobby Code*</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup className="gap-1">
                        {
                          Array.from({ length: 4 }).map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))
                        }
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={createLobby.isPending} type="submit" className="w-full">
              Start Lobby
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};