import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/temp")({
  component: RouteComponent,
});

const questionAnswerSchema = z.object({
  answer: z.string().min(1, "Answer is required").trim(),
});

type QuestionAnswer = z.infer<typeof questionAnswerSchema>;

const data = {
  moduleId: "1",
  name: "React",
  questions: {
    questionId: "1",
    content: "What is tanstack router ?",
  },
};

function RouteComponent() {
  const form = useForm<QuestionAnswer>({
    resolver: zodResolver(questionAnswerSchema),
    mode: "all",
    defaultValues: {
      answer: "",
    },
  });
  const handleSubmit = (value: QuestionAnswer) => {
    console.log(value);
    form.reset({"answer" : ""})
  };

  return (
    <>
      <div className="flex justify-center px-4 py-10">
        <Card className="w-full max-w-2xl rounded-2xl shadow-lg border">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center justify-between text-xl font-semibold">
              <span>{data.name}</span>
              <span className="text-sm text-muted-foreground font-normal">
                {data.moduleId}
              </span>
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Answer the below question..
            </CardDescription>
          </CardHeader>

          <CardContent className="py-4">
            <P className="text-base leading-relaxed text-foreground">
              {data.questions.content}
            </P>
          </CardContent>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="px-6 space-y-2">
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        className="resize-none rounded-lg border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="Write your answer here..."
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-destructive" />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end px-6 pt-6">
                <Button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-medium"
                  disabled={!form.formState.isValid}
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
