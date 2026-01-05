import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";

interface Answer {
  userId: string;
  userName: string;
  answer: string;
}
interface UserAnswersSidebarProps {
  answers: Answer[];
  correctAnswer: string;
}

export function UserAnswersSidebar({
  answers,
  correctAnswer,
}: UserAnswersSidebarProps) {
  return (
    <div className="min-w-100 shrink">
      <Card className="rounded-2xl hover:shadow-lg border sticky top-2">
        <CardHeader >
          <CardTitle className="text-lg font-semibold">
            User Answers
          </CardTitle>
          <CardDescription className="text-sm">
            {answers.length} responses
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 max-h-[calc(63vh-11rem)] overflow-y-auto">
          {answers.map((answer) => {
            const isCorrect = answer.answer.toLowerCase() === correctAnswer.toLowerCase();
            
            return (
              <div
                key={answer.userId}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  isCorrect
                    ? "bg-green-50 dark:bg-green-950/20 border-green-500/50"
                    : "bg-muted/30 border-muted"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {answer.userName}
                  </span>
                  {isCorrect && (
                    <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">
                      ✓
                    </span>
                  )}
                </div>
                <P>
                  {answer.answer}
                </P>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}