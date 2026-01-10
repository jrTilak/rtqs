import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Trash, Upload } from "lucide-react";
import type { QuizModule } from "@/server/apis/quiz-modules/types";
import { confirm } from "@/components/ui/alert-dialog/utils";
import { server } from "@/server/apis";
import { AddQuestionDialog } from "../quiz-questions/add-question-dialog";
import { QuestionsList } from "../quiz-questions/questions-list";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { InputExcelDialog } from "@/components/ui/input-excel-dialog";
import { parseErrorMessage } from "@/lib/parse-error-message";

interface ModuleCardProps {
  module: QuizModule;
  quizId: string;
}

export const ModuleCard = ({ module, quizId }: ModuleCardProps) => {
  const deleteModule = server.quizModules.useDeleteMany();
  const onDeleteModule = async () => {
    const should = await confirm({
      title: `Are you sure you want to delete '${module.name}' module?`,
      description:
        "Deleting this module will also permanently remove all questions associated with it.",
      action: "Yes, Delete it!",
      variant: "destructive",
      waitUntillAction: 5,
    });
    if (!should) return;
    deleteModule.mutate({ ids: [module.id], quizId: quizId });
  };
  const addQuestions = server.quizQuestions.useCreate();
  return (
    <>
      <Collapsible>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1 items-center flex">
                <CardTitle className="text-lg">
                  <span className="text-muted-foreground">#{module.index}</span>{" "}
                  {module.name}
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="ml-4">
                      <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <InputExcelDialog
                  title="Bulk upload questions"
                  description="Upload an excel sheet with column QUESTION and ANSWER"
                  onImport={async (data) => {
                    try {
                      await addQuestions.mutateAsync({
                        moduleId: module.id,
                        data: data.map((d, i) => ({
                          answer: d.ANSWER,
                          question: d.QUESTION,
                          index: i + 1,
                        })),
                      });
                    } catch (error) {
                      await alert({
                        title: "Failed to add question",
                        description: parseErrorMessage(error),
                        variant: "destructive",
                      });
                    }
                  }}
                  columns={["QUESTION", "ANSWER"]}
                >
                  <Button
                    isLoading={addQuestions.isPending}
                    variant="outline"
                    size={"icon"}
                  >
                    <Upload />
                  </Button>
                </InputExcelDialog>
                <AddQuestionDialog module={module} />
                <Button
                  variant="destructive-outline"
                  size="icon-sm"
                  onClick={onDeleteModule}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <QuestionsList moduleId={module.id} />
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </>
  );
};
