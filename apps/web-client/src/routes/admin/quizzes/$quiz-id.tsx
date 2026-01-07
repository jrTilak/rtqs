import { createFileRoute } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ListIcon, Upload, UsersRound } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { AddModuleDialog } from "@/screens/admin/quizzes/quiz-modules/add-module-dialog";
import { ModulesList } from "@/screens/admin/quizzes/quiz-modules/modules-list";
import { server } from "@/server/apis";
import { QueryState } from "@/components/ui/query-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParticipantsList } from "@/screens/admin/quizzes/quiz-participants/participants-list";
import { useState } from "react";
import { AddParticipantDialog } from "@/screens/admin/quizzes/quiz-participants/add-participant-dialog";
import { BreadcrumbTitle } from "@/components/layout/admin/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/admin/quizzes/$quiz-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "quiz-id": quizId } = Route.useParams();
  const navigate = useNavigate();
  const quiz = server.quizzes.useFindById(quizId);

  const [tabValue, setTabValue] = useState("quiz");

  return (
    <div className="max-w-5xl w-full mx-auto">
      <BreadcrumbTitle items={["Quiz", quiz.data?.name ?? "---"]} />
      <QueryState {...quiz} isEmpty={!quiz?.data}>
        <QueryState.Error />
        <QueryState.Loading />
        <QueryState.Empty />
        <QueryState.Data>
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-2">
              <H2>{quiz.data?.name}</H2>
              {quiz.data?.description && <P>{quiz.data?.description}</P>}
            </div>
            {tabValue === "quiz" ? (
              <AddModuleDialog quizId={quizId} />
            ) : (
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" size={"icon"}>
                      <Upload />
                    </Button>
                    <TooltipContent>
                      <P className="text-sm">
                        Upload participant data in bulk using an Excel file.
                      </P>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
                <AddParticipantDialog quizId={quizId} />
              </div>
            )}
          </div>

          <Tabs value={tabValue} onValueChange={setTabValue}>
            <TabsList variant={"underline"}>
              <TabsTrigger value="quiz" className="px-3">
                <ListIcon />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="participants">
                <UsersRound />
                Participants
              </TabsTrigger>
            </TabsList>
            <TabsContent value="quiz">
              <ModulesList quizId={quizId} />
            </TabsContent>
            <TabsContent value="participants">
              <ParticipantsList quizId={quizId} />
            </TabsContent>
          </Tabs>
        </QueryState.Data>
      </QueryState>
    </div>
  );
}
