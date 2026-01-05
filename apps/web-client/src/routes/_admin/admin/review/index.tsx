import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuestionContent } from "@/components/others/admin/review/question-content";
import { UserAnswersSidebar } from "@/components/others/admin/review/user-answer-sidebar";

export const Route = createFileRoute("/_admin/admin/review/")({
  component: RouteComponent,
});

const data = {
  moduleId: "1",
  name: "React",
  questions: [
    {
      questionId: "1",
      content: "What is tanstack router?",
      correctAnswer: "Type-safe router",
      answers: [
        {
          userId: "user_1",
          userName: "John Doe",
          answer: "Type-safe router",
        },
        {
          userId: "user_2",
          userName: "Jane Smith",
          answer: "Routing library",
    
        },
        {
          userId: "user_3",
          userName: "Mike Johnson",
          answer: "React router",
        },
        {
          userId: "user_4",
          userName: "Sarah Wilson",
          answer: "Type-safe router",
        },
      ],
    },
    {
      questionId: "2",
      content: "What are the benefits of using React hooks?",
      correctAnswer: "Reusable logic",
      answers: [
        {
          userId: "user_1",
          userName: "John Doe",
          answer: "Reusable logic",
        },
        {
          userId: "user_2",
          userName: "Jane Smith",
          answer: "Simpler components",
        },
        {
          userId: "user_3",
          userName: "Mike Johnson",
          answer: "State management",
        },
      ],
    },
    {
      questionId: "3",
      content: "Explain the virtual DOM in React.",
      correctAnswer: "Lightweight DOM copy",
      answers: [
        {
          userId: "user_1",
          userName: "John Doe",
          answer: "DOM optimization",
        },
        {
          userId: "user_2",
          userName: "Jane Smith",
          answer: "Lightweight DOM copy",
        },
      ],
    },
  ],
};

function RouteComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = data.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === data.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if(currentQuestionIndex != 0 ) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }
  return (
    <div className="flex justify-center gap-6 px-4 py-10 w-full">
      <div className="flex gap-6 max-w-7xl w-full">
        <QuestionContent
          moduleName={data.name}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={data.questions.length}
          moduleId={data.moduleId}
          question={currentQuestion.content}
          correctAnswer={currentQuestion.correctAnswer}
          isLastQuestion={isLastQuestion}
          isFirstQuestion = {isFirstQuestion}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        <UserAnswersSidebar
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.correctAnswer}
        />
      </div>
    </div>
  );
}
