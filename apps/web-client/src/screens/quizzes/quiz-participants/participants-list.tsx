import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizParticipant } from "@/server/apis/quiz-participants/types";
import { confirm } from "@/components/ui/alert-dialog/utils";

interface ParticipantsListProps {
  quizId: string;
}

export const ParticipantsList = ({ quizId }: ParticipantsListProps) => {
  const participants = server.quizParticipants.useList({ quizId });
  const deleteMany = server.quizParticipants.useDeleteMany();

  const onDelete = async (participant: QuizParticipant) => {
    const should = await confirm({
      title: "Delete Participant",
      description:
        "Are you sure you want to delete this participant with email " +
        participant.email +
        "?",
      variant: "destructive",
      waitUntillAction: 5,
    });
    if (!should) return;
    deleteMany.mutate({
      quizId,
      ids: [participant.id],
    });
  };

  return (
    <QueryState {...participants} isEmpty={participants.data?.length === 0}>
      <QueryState.Error />
      <QueryState.Loading />
      <QueryState.Empty>No participants found.</QueryState.Empty>
      <QueryState.Data>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">S.No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-left w-40">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.data?.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell className="w-40 ml-auto">
                    <Button
                      size={"icon"}
                      className="text-destructive"
                      variant="ghost"
                      onClick={() => {
                        onDelete(participant);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </QueryState.Data>
    </QueryState>
  );
};
