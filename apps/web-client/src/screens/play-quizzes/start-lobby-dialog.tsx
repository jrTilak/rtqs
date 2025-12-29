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
import { Input } from "@/components/ui/input";
import { InputOTPForm } from "@/components/ui/opt-form/opt-from";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const startLobbySchema = z.object({
  playerName: z.string().min(1, "Player name is required").max(50, "Name is too long"),
  lobbyCode: z.string().length(6, "Lobby code must be 6 characters"),
});

type StartLobbyFormValues = z.infer<typeof startLobbySchema>;

export const StartLobbyDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<StartLobbyFormValues>({
    resolver: zodResolver(startLobbySchema),
    defaultValues: {
      playerName: "",
      lobbyCode: "",
    },
  });

  const handleStartLobby = (values: StartLobbyFormValues) => {
    console.log("Starting lobby - Player:", values.playerName, "Code:", values.lobbyCode);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Start Lobby
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Lobby</DialogTitle>
          <DialogDescription>
            Enter your name to start a new lobby
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleStartLobby)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lobbyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lobby Code</FormLabel>
                  <FormControl>
                    <InputOTPForm value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Start Lobby
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};