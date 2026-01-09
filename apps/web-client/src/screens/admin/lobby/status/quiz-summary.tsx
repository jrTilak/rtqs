import type { LobbyProps } from "..";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { H3, P } from "@/components/ui/typography";
import { Trophy } from "lucide-react";

export const QuizSummary = ({ lobby }: LobbyProps) => {
  const summary = (lobby as any).quizSummary || [];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-8 h-full items-center justify-center">
      <Card className="w-full max-w-2xl border-none shadow-none bg-transparent">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Trophy className="size-20 text-yellow-500 animate-bounce" />
          <H3 className="text-4xl font-bold text-foreground">Quiz Ended!</H3>
          <P className="text-muted-foreground text-center max-w-md">
            Here are the final standings.
          </P>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {summary.map((item: any, index: number) => (
                  <div
                    key={item.player.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-8 font-bold text-muted-foreground">
                        #{item.rank || index + 1}
                      </div>
                      <Avatar className="size-10 border">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.player.name}`}
                        />
                        <AvatarFallback>{item.player.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <P className="font-semibold leading-none">
                          {item.player.name}
                        </P>
                        <P className="text-xs text-muted-foreground">
                          {item.player.email}
                        </P>
                      </div>
                    </div>
                    <div className="font-bold text-xl">
                      {item.score}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        pts
                      </span>
                    </div>
                  </div>
                ))}
                {summary.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No participants found.
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};
