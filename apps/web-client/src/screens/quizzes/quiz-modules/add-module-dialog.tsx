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
import { useEffect, useState } from "react";
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
import { server } from "@/server/apis";
import { alert } from "@/components/ui/alert-dialog/utils";
import { parseErrorMessage } from "@/lib/parse-error-message";

const formSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  order: z.coerce.number({ message: "Module order is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  order: 1,
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
  const quizModules = server.quizModules.useListQuizModules({ id: quizId });
  const addModule = server.quizModules.useCreateQuizModule();

  const onSubmit = async (data: FormSchema) => {
    try {
      await addModule.mutateAsync({
        quizId,
        index: data.order,
        name: data.name,
      });
      setOpen(false);
      form.reset(defaultValues);
    } catch (error) {
      await alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (form.getValues("name")) return;
    if (!quizModules.data?.length) {
      form.setValue("name", "Module 1");
      form.setValue("order", 1);
    } else {
      form.setValue("name", `Module ${quizModules.data.length + 1}`);
      form.setValue("order", quizModules.data.length + 1);
    }
  }, [quizModules.data]);

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

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Order*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 1"
                      {...field}
                      autoComplete="off"
                      autoCapitalize="on"
                      type="text"
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
                isLoading={addModule.isPending}
                type="submit"
                className="px-6"
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
