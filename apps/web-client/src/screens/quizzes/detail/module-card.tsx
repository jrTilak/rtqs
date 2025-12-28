import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { useState } from "react";
import { AddQuestionDialog } from "../modules/add-question-dialog";
import { QuestionsList } from "../modules/questions-list";
import { H4 } from "@/components/ui/typography";

interface Module {
  id: string;
  name: string;
}

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${module.name}"?`)) {
      // TODO: Add API call here
      console.log("Deleting module:", module.id);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg">{module.name}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </CardHeader>

          <CardContent className="pt-0">
            <div className="flex justify-between items-center mb-4">
              <H4 className="font-medium text-sm">Questions</H4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setQuestionDialogOpen(true)}
              >
                <Plus className="h-4 w-4" /> Add Question
              </Button>
            </div>
            <QuestionsList moduleId={module.id} />
          </CardContent>
      </Card>

      <AddQuestionDialog
        open={questionDialogOpen}
        onOpenChange={setQuestionDialogOpen}
        moduleId={module.id}
        moduleName={module.name}
      />
    </>
  );
};