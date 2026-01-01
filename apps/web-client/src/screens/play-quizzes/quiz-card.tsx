import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { Quiz } from "@/server/apis/quizzes/types";
import { formatDistanceToNow } from "date-fns";
import { Calendar, } from "lucide-react";
import { StartLobbyDialog } from "./start-lobby-dialog";

export const QuizCard = ({ quiz }: { quiz: Quiz }) => {

  return (
    <Card
      className="gap-2 hover:border-primary border-transparent border relative"
    >
      <CardHeader>
        <CardTitle className="text-lg">{quiz.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Text>{quiz.description || "No description provided"}</Text>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3 h-3" />
            <Text>
              Last Updated{" "}
              {formatDistanceToNow(quiz.updatedAt, { addSuffix: true })}
            </Text>
          </div>
          <StartLobbyDialog quizId={quiz.id} />
        </div>
      </CardContent>
    </Card>
  );
};
