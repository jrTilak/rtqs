import { QuestionCard } from "./question-card";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";

interface QuestionsListProps {
  moduleId: string;
}

export const QuestionsList = ({ moduleId }: QuestionsListProps) => {
  const questions = server.quizQuestions.useListQuizQuestions({ moduleId });

  return (
    <QueryState {...questions} isEmpty={questions.data?.length === 0}>
      <QueryState.Error />
      <QueryState.Loading />
      <QueryState.Empty>
        No questions yet. Click "Add Question" to create one.
      </QueryState.Empty>
      <QueryState.Data>
        <div className="space-y-2">
          {questions.data?.map((question) => (
            <QuestionCard key={question.question} question={question} />
          ))}
        </div>
      </QueryState.Data>
    </QueryState>
  );
};
