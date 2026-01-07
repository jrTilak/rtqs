import type { LobbyProps } from "..";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { H3, P } from "@/components/ui/typography";

// Mock Data
const MOCK_DATA = {
  correctAnswer: "Paris",
  winner: {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    answer: "Paris",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  participants: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      answer: "Paris",
      isCorrect: true,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      answer: "London",
      isCorrect: false,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      answer: "Paris",
      isCorrect: true, // Correct but late
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    },
    {
      id: "4",
      name: "David Lee",
      email: "david@example.com",
      answer: "Berlin",
      isCorrect: false,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "5",
      name: "Eva Green",
      email: "eva@example.com",
      answer: "Paris",
      isCorrect: true,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva",
    },
    {
      id: "6",
      name: "Frank White",
      email: "frank@example.com",
      answer: "Madrid",
      isCorrect: false,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
    },
  ],
};

export const QuestionResponseSummary = ({ lobby }: LobbyProps) => {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-8 h-full">
      {/* Correct Answer Section */}
      <div className="text-center space-y-2">
        <P className="text-muted-foreground uppercase tracking-wider text-sm font-medium">
          Correct Answer
        </P>
        <H3 className="text-3xl font-bold text-success text-green-600 dark:text-green-400">
          {MOCK_DATA.correctAnswer}
        </H3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Winner Section */}
        <Card className="border-2 border-yellow-500/50 bg-yellow-500/5 dark:bg-yellow-500/10 flex flex-col justify-center items-center p-8 gap-4 shadow-lg shadow-yellow-500/10">
          <Trophy className="size-16 text-yellow-500 animate-bounce" />
          <div className="text-center space-y-2">
            <P className="font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
              Fastest Correct Answer
            </P>
            <Avatar className="size-24 border-4 border-yellow-500 shadow-xl mx-auto">
              <AvatarImage src={MOCK_DATA.winner.avatarUrl} />
              <AvatarFallback>{MOCK_DATA.winner.name[0]}</AvatarFallback>
            </Avatar>
            <H3 className="text-2xl font-bold">{MOCK_DATA.winner.name}</H3>
            <Badge
              variant="outline"
              className="border-yellow-500 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10"
            >
              +100 Points
            </Badge>
          </div>
        </Card>

        {/* Participants List */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="pb-4 border-b bg-muted/30">
            <CardTitle className="text-lg">Responses</CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="not-prose relative w-full overflow-hidden">
              <div className="overflow-auto">
                <table className="w-full text-left text-sm caption-bottom text-muted-foreground table-auto m-0">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        User
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
                        Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {MOCK_DATA.participants.map((participant) => (
                      <tr
                        key={participant.id}
                        className={cn(
                          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                          participant.id === MOCK_DATA.winner.id &&
                            "bg-yellow-500/10 hover:bg-yellow-500/20"
                        )}
                      >
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium text-foreground">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarImage src={participant.avatarUrl} />
                              <AvatarFallback>
                                {participant.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-foreground">
                                {participant.name}
                              </span>
                              {participant.id === MOCK_DATA.winner.id && (
                                <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-wide">
                                  Winner
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span
                              className={cn(
                                "font-medium",
                                participant.isCorrect
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-destructive"
                              )}
                            >
                              {participant.answer}
                            </span>
                            {participant.isCorrect ? (
                              <Check className="size-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <X className="size-4 text-destructive" />
                            )}
                          </div>
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
