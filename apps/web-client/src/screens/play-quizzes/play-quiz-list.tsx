import { QueryState } from "@/components/ui/query-state";
import { Skeleton } from "@/components/ui/skeleton";
import { server } from "@/server/apis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { StartLobbyDialog } from "./start-lobby-dialog";

export const PlayQuizzesList = () => {
  const quizzes = server.quizzes.useListQuizzes();

  return (
    <QueryState {...quizzes} isEmpty={quizzes.data?.length === 0}>
      <QueryState.Empty>No quizzes found, please add one.</QueryState.Empty>
      <QueryState.Loading>
        <Skeleton className="h-32" />
      </QueryState.Loading>
      <QueryState.Error />
      <QueryState.Data>
        <Card className="hover:border-primary border-transparent border">
          <CardHeader>
            <CardTitle className="text-lg">Start a Quiz Lobby</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <Text className="text-muted-foreground">
              Create a new lobby to play with others
            </Text>
            <StartLobbyDialog />
          </CardContent>
        </Card>
      </QueryState.Data>
    </QueryState>
  );
};