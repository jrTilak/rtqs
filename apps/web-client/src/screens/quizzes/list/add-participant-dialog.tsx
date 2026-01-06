import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  email: "",
};

export const AddParticipantDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      // Mock implementation
      console.log("Adding participant:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setOpen(false);
      form.reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Participant
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Participant</DialogTitle>
          <DialogDescription>
            Enter the email address of the participant to invite.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      {...field}
                      autoComplete="off"
                      autoCapitalize="none"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  form.reset(defaultValues);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4"
                isLoading={form.formState.isSubmitting}
              >
                Add <Plus />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
