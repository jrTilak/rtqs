import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { QuizzesList } from "@/screens/quizzes/list/quizzes-list";
import { AddQuizDialog } from "@/screens/quizzes/list/add-quiz-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListIcon, UsersIcon } from "lucide-react";
import { AddParticipantDialog } from "@/screens/quizzes/list/add-participant-dialog";
import { ParticipantsList } from "@/screens/quizzes/list/participants-list";

export const Route = createFileRoute("/admin/quizzes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <H2>Quizzes</H2>
      </div>
      <Tabs defaultValue="list">
        <TabsList variant={"underline"}>
          <TabsTrigger value="list" className="px-4">
            <ListIcon />
            List
          </TabsTrigger>
          <TabsTrigger value="participants">
            <UsersIcon />
            Participants
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <div className="flex justify-between items-center border-b pb-1">
            <P className="text-lg">Manage your quizzes here.</P>
            <AddQuizDialog />
          </div>
          <QuizzesList />
        </TabsContent>
        <TabsContent value="participants">
          <div className="flex justify-between items-center border-b pb-1">
            <P className="text-lg">Manage participants here.</P>
            <AddParticipantDialog />
          </div>
          <ParticipantsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
