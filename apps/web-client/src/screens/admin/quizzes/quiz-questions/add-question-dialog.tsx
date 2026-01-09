//@ts-check
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
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
import type { QuizModule } from "@/server/apis/quiz-modules/types";
import { useEffect, useState } from "react";
import { server } from "@/server/apis";
import { alert } from "@/components/ui/alert-dialog/utils";
import { parseErrorMessage } from "@/lib/parse-error-message";

const formSchema = z.object({
  question: z.string().min(1, "Question text is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.coerce.number({ message: "Order is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  question: "",
  answer: "",
  order: 1,
};

interface AddQuestionDialogProps {
  module: QuizModule;
}

export const AddQuestionDialog = ({ module }: AddQuestionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const addQuestions = server.quizQuestions.useCreate();
  const form = useForm<FormSchema>({
    // @ts-expect-error: todo fix
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const questions = server.quizQuestions.useList({
    moduleId: module.id,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await addQuestions.mutateAsync({
        moduleId: module.id,
        data: [
          {
            question: data.question,
            answer: data.answer,
            index: data.order,
          },
        ],
      });
      setIsOpen(false);
      form.reset(defaultValues);
    } catch (error) {
      await alert({
        title: "Failed to add question",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (form.getValues("question") || form.getValues("answer")) return;
    if (!questions.data?.length) {
      form.setValue("order", 1);
    } else {
      form.setValue("order", questions.data.length + 1);
    }
  }, [questions.data]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon-sm"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Question</DialogTitle>
          <DialogDescription>
            Add a question to "{module.name}"
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question*</FormLabel>
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

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Order*</FormLabel>
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
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={addQuestions.isPending}
                type="submit"
                className="px-4"
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
