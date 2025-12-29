import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import type { QuizModule } from "@/server/apis/quiz-modules/types";
import { confirm } from "@/components/ui/alert-dialog/utils";
import { server } from "@/server/apis";
import { AddQuestionDialog } from "../quiz-questions/add-question-dialog";
import { QuestionsList } from "../quiz-questions/questions-list";

interface ModuleCardProps {
  module: QuizModule;
}

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const deleteModule = server.quizModules.useDeleteQuizModule();
  const onDeleteModule = async () => {
    const should = await confirm({
      title: `Are you sure you want to delete '${module.name}' module?`,
      description:
        "After deleting this module, all the questions in it will be deleted as well.",
      action: "Yes, Delete it!",
      variant: "destructive",
      waitUntillAction: 5,
    });
    if (!should) return;
    deleteModule.mutate({ ids: [module.id], quizId: module.quizId });
  };
  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg">
                {module.name}{" "}
                <span className="text-muted-foreground">#{module.index}</span>
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <AddQuestionDialog module={module} />
              {/* <Button variant="outline" size={"icon"}>
                <Edit />
              </Button> */}
              <Button
                variant="destructive-outline"
                size="icon"
                onClick={onDeleteModule}
              >
                <Trash />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <QuestionsList moduleId={module.id} />
        </CardContent>
      </Card>
    </>
  );
};
