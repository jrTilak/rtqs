import type { LobbyProps } from "..";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { H3, P } from "@/components/ui/typography";

// Mock Data
const MOCK_DATA = {
  winner: {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    score: 950,
    totalCorrect: 19,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  participants: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      score: 950,
      totalCorrect: 19,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      score: 880,
      totalCorrect: 18,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    },
    {
      id: "5",
      name: "Eva Green",
      email: "eva@example.com",
      score: 820,
      totalCorrect: 17,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      score: 750,
      totalCorrect: 15,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    {
      id: "4",
      name: "David Lee",
      email: "david@example.com",
      score: 600,
      totalCorrect: 12,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "6",
      name: "Frank White",
      email: "frank@example.com",
      score: 450,
      totalCorrect: 9,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
    },
  ],
};

export const QuizSummary = ({ lobby: _ }: LobbyProps) => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-8 h-full">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <P className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
          Quiz Completed
        </P>
        <H3 className="text-3xl font-bold text-primary">Leaderboard</H3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Winner Section */}
        <Card className="border-2 border-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-transparent flex flex-col justify-center items-center p-8 gap-6 shadow-lg shadow-yellow-500/10">
          <div className="relative">
            <Trophy className="size-20 text-yellow-500 animate-bounce" />
            <div className="absolute -top-2 -right-2 transform rotate-12">
              <Medal className="size-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <P className="font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest text-lg">
              Quiz Champion
            </P>
            <Avatar className="size-32 border-4 border-yellow-500 shadow-2xl mx-auto ring-4 ring-yellow-500/20">
              <AvatarImage src={MOCK_DATA.winner.avatarUrl} />
              <AvatarFallback>{MOCK_DATA.winner.name[0]}</AvatarFallback>
            </Avatar>
            <div className="pt-2">
              <H3 className="text-3xl font-bold">{MOCK_DATA.winner.name}</H3>
              <P className="text-muted-foreground">{MOCK_DATA.winner.email}</P>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
            <div className="text-center p-3 bg-background/50 rounded-lg border">
              <div className="text-2xl font-bold">{MOCK_DATA.winner.score}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Points
              </div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg border">
              <div className="text-2xl font-bold">
                {MOCK_DATA.winner.totalCorrect}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Correct
              </div>
            </div>
          </div>
        </Card>

        {/* Full Leaderboard List */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="pb-4 border-b bg-muted/30">
            <CardTitle className="flex items-center justify-between">
              <span>Rankings</span>
              <Badge variant="secondary">
                {MOCK_DATA.participants.length} Players
              </Badge>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="not-prose relative w-full overflow-hidden">
              <div className="overflow-auto">
                <table className="w-full text-left text-sm caption-bottom text-muted-foreground table-auto m-0">
                  <thead className="[&_tr]:border-b bg-muted/20 sticky top-0 z-10 backdrop-blur-sm">
                    <tr className="border-b transition-colors">
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground w-12 text-center">
                        #
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground">
                        Player
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">
                        Score
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right hidden sm:table-cell">
                        Correct
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {MOCK_DATA.participants.map((participant, index) => (
                      <tr
                        key={participant.id}
                        className={cn(
                          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                          index === 0 &&
                            "bg-yellow-500/5 hover:bg-yellow-500/10",
                          index === 1 && "bg-slate-300/5 hover:bg-slate-300/10",
                          index === 2 && "bg-amber-700/5 hover:bg-amber-700/10"
                        )}
                      >
                        <td className="p-4 align-middle font-medium text-center">
                          {index === 0 ? (
                            <Trophy className="size-4 text-yellow-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground opacity-70">
                              {index + 1}
                            </span>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8 border">
                              <AvatarImage src={participant.avatarUrl} />
                              <AvatarFallback>
                                {participant.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span
                                className={cn(
                                  "font-medium text-sm text-foreground",
                                  index === 0 && "font-bold"
                                )}
                              >
                                {participant.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-right font-mono font-medium">
                          {participant.score}
                        </td>
                        <td className="p-4 align-middle text-right font-mono text-muted-foreground hidden sm:table-cell">
                          {participant.totalCorrect}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
