import { P } from "@/components/ui/typography";
import { QuestionCard } from "./question-card";

interface QuestionsListProps {
  moduleId: string;
}

const MOCK_QUESTIONS: Record<string, any[]> = {
  "1": [
    { id: "q1", text: "What is React?", moduleId: "1", order: 1, answer: "A JavaScript library for building user interfaces." },
    { id: "q2", text: "What is JSX?", moduleId: "1", order: 2, answer: "A syntax extension for JavaScript." },
    { id: "q3", text: "What are components?", moduleId: "1", order: 3, answer: "Reusable pieces of code that return React elements."   },
  ],
  "2": [
    { id: "q4", text: "What does useState return?", moduleId: "2", order: 1, answer: "An array containing the current state and a function to update it." },
    { id: "q5", text: "When does useEffect run?", moduleId: "2", order: 2, answer: "After the component renders and after every re-render." },
  ],
};

export const QuestionsList = ({ moduleId }: QuestionsListProps) => {
  const questions = MOCK_QUESTIONS[moduleId] || [];

  if (questions.length === 0) {
    return (
      <P>
        No questions yet. Click "Add Question" to create one.
      </P>
    );
  }

  return (
    <div className="space-y-2">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} answer={question.answer} />
      ))}
    </div>
  );
};