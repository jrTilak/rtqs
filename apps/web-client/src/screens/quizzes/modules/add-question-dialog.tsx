import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  text: z.string().min(1, "Question text is required"),
  answer: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  text: "",
  answer: "",
};

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
  moduleName: string;
}

export const AddQuestionDialog = ({ 
  open, 
  onOpenChange, 
  moduleId, 
  moduleName 
}: AddQuestionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormSchema) => {
    console.log("Creating question:", { ...data, moduleId });
    
    onOpenChange(false);
    form.reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Question</DialogTitle>
          <DialogDescription>
            Add a question to "{moduleName}"
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., What's Up?"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Nice to see you."
                      {...field}
                      autoComplete="off"
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
                  onOpenChange(false);
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