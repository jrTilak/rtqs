import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Trash } from "lucide-react";
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
        "After deleting this module, all the questions in it will be deleted as well.",
      action: "Yes, Delete it!",
      variant: "destructive",
      waitUntillAction: 5,
    });
    if (!should) return;
    deleteModule.mutate({ ids: [module.id], quizId: quizId });
  };
  return (
    <>
      <Collapsible>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1 items-center flex">
                <CardTitle className="text-lg">
                  {module.name}{" "}
                  <span className="text-muted-foreground">#{module.index}</span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-4">
                      <ChevronsUpDown />
                    </Button>
                  </CollapsibleTrigger>
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
