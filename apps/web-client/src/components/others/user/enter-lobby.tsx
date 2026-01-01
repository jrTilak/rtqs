import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form/form";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTPForm } from "../../ui/opt-form/opt-from";
import { useNavigate } from "@tanstack/react-router";

const enterLobbySchema = z.object({
  lobbyCode: z.string().length(6, "Lobby code must be 6 characters"),
});

export type EnterLobbyFormValues = z.infer<typeof enterLobbySchema>;

export function StartLobbyDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 
  const form = useForm<EnterLobbyFormValues>({
    resolver: zodResolver(enterLobbySchema),
    defaultValues: {
      lobbyCode: "",
    },
  });
  const handleStartLobby = (values: EnterLobbyFormValues) => {
    setOpen(false);
    form.reset();
    console.log("Lobby-code:", values.lobbyCode);
    navigate({ 
      to: "/lobby/$lobby-id",
      params: { "lobby-id": values.lobbyCode } 
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Enter Code</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Enter the Lobby Code</DialogTitle>
            <DialogDescription>
              Please enter the code provided to you to join the lobby.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleStartLobby)}
              className="space-y-8"
            >
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Enter the Lobby</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
