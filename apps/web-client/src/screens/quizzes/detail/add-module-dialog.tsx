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
import { Input } from "@/components/ui/input";
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
  name: z.string().min(1, "Module name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
};

interface AddModuleDialogProps {
  quizId: string;
}

export const AddModuleDialog = ({ quizId }: AddModuleDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormSchema) => {
    // TODO: Add API call here
    console.log("Creating module:", { ...data, quizId });
    
    setOpen(false);
    form.reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Module
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Module</DialogTitle>
          <DialogDescription>
            Create a new module for this quiz.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Module 1"
                      {...field}
                      autoComplete="off"
                      autoCapitalize="on"
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
              <Button type="submit" className="px-4">
                Add <Plus />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};