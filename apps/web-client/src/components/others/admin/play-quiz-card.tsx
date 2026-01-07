import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { Quiz } from "@/server/apis/quizzes/types";
import { formatDistanceToNow } from "date-fns";
import { Calendar } from "lucide-react";
import { StartLobbyDialog } from "@/screens/play-quizzes/start-lobby-dialog";

export const PlayQuizCard = ({ quiz }: { quiz: Quiz }) => {
  return (
    <Card className="gap-2 hover:border-primary border-transparent border">
      <CardHeader>
        <CardTitle className="text-lg">{quiz.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Text>{quiz.description || "No description provided"}</Text>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>
              {formatDistanceToNow(quiz.updatedAt, { addSuffix: true })}
            </span>
          </div>

          <StartLobbyDialog quizId={quiz.id} />
        </div>
      </CardContent>
    </Card>
  );
};
