import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/typography";
import { Trash, Edit } from "lucide-react";

interface Question {
  id: string;
  text: string;
  moduleId: string;
  order?: number;
}

interface QuestionCardProps {
  question: Question;
  answer?: string;
}

export const QuestionCard = ({ question, answer }: QuestionCardProps) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this question?")) {
      console.log("Deleting question:", question.id);
    }
  };

  const handleEdit = () => {
    console.log("Editing question:", question.id);
  };

  return (
    <div className="group flex items-start justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex-1 space-y-1">
        <P className="font-medium text-gray-900 leading-snug">
          {question.text}
        </P>

        {answer && (
          <P className="text-sm text-muted-foreground">
            {answer}
          </P>
        )}
      </div>


      <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-700"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
