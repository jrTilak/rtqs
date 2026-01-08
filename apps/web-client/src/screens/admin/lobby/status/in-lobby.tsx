"use client";

import { useState } from "react";
import { Timer } from "@/components/ui/timer";
import type { GetLobbyResponse } from "@/server/apis/play-quiz";
import { P, H3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Play, SkipForward, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ws } from "@/server/ws";
import { alert } from "@/components/ui/alert-dialog/utils";
import { parseErrorMessage } from "@/lib/parse-error-message";
import type { LobbyProps } from "..";

export const InLobby = ({ lobby }: LobbyProps) => {
  const updateLobby = ws.playQuiz.useUpdateLobby();
  const [action, setAction] = useState("");
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);

  const handleAddMinute = async () => {
    try {
      setAction("add-minute");
      const newWaitUntil = new Date(lobby.waitUntil!);
      newWaitUntil.setMinutes(newWaitUntil.getMinutes() + 1);

      await updateLobby.mutateAsync({
        id: lobby.id,
        waitUntil: newWaitUntil.toISOString(),
      });
      setIsTimerCompleted(false);
    } catch (error) {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setAction("");
    }
  };

  const handleSkipTimer = async () => {
    try {
      setAction("skip-timer");
      await updateLobby.mutateAsync({
        id: lobby.id,
        waitUntil: new Date().toISOString(),
      });
      setIsTimerCompleted(true);
    } catch (error) {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setAction("");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4">
            <H3>
              {lobby.quiz.name} / {lobby.name}
            </H3>
            <div>
              <P className="text-muted-foreground text-sm">Lobby Code</P>
              <H3>{lobby.code}</H3>
            </div>
            <div>
              <P className="text-muted-foreground text-sm">Participants</P>
              <P className="font-medium">{lobby.participants.length} joined</P>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-center items-center text-center py-10">
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <span className="text-muted-foreground uppercase text-sm tracking-widest font-medium">
                Quiz Starts In
              </span>
              <Timer
                futureTime={new Date(lobby.waitUntil!).getTime()}
                className="text-6xl font-bold tracking-tight text-foreground"
                onComplete={() => setIsTimerCompleted(true)}
              />
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <div className="w-full flex gap-2 items-center justify-between">
                <Button
                  variant="outline"
                  isLoading={action === "add-minute" && updateLobby.isPending}
                  onClick={handleAddMinute}
                >
                  <Clock />
                  Add 1 Min
                </Button>
                <Button
                  isLoading={action === "skip-timer" && updateLobby.isPending}
                  disabled={isTimerCompleted}
                  variant="outline"
                  onClick={handleSkipTimer}
                >
                  <SkipForward />
                  Skip Timer
                </Button>
              </div>
              <Button disabled={!isTimerCompleted}>
                <Play />
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="size-5" />
            Joined Participants
          </CardTitle>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
            Total: {lobby.participants.length}
          </span>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">SN</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lobby.participants.map((participant: any, index: number) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
