import { QueryState } from "@/components/ui/query-state";
import { server } from "@/server/apis";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IconSelector } from "@tabler/icons-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Trash2 } from "lucide-react";
import { alert, confirm } from "@/components/ui/alert-dialog/utils";
import { parseErrorMessage } from "@/lib/parse-error-message";
type Props = {
  quizId: string;
};

const Lobbies = ({ quizId }: Props) => {
  const lobbies = server.playQuiz.useListLobbies({ quizId });
  const deleteLobby = server.playQuiz.useDeleteLobbies();

  const onDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const shouldDelete = await confirm({
      title: "Delete Lobby",
      description:
        "Are you sure you want to delete this lobby? All user submissions and related data will be permanently lost.",
      variant: "destructive",
      waitUntillAction: 10,
    });
    if (!shouldDelete) return;
    try {
      await deleteLobby.mutateAsync({
        ids: [id],
        quizId,
      });
    } catch (e) {
      await alert({
        title: "Error",
        description: parseErrorMessage(e),
        variant: "destructive",
      });
    }
  };

  return (
    <QueryState {...lobbies} isEmpty={lobbies?.data?.length === 0}>
      <QueryState.Error />
      <QueryState.Data>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button className="w-full justify-between" variant={"ghost"}>
              <span> Lobbies ({lobbies.data?.length})</span>
              <IconSelector />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {lobbies.data?.map((lobby: any) => (
              <Card
                key={lobby.id}
                className="p-2 flex flex-row justify-between items-center mb-2"
              >
                <CardHeader className="flex items-center flex-1 ">
                  <CardTitle className="text-sm">
                    {lobby.name} - Code: {lobby.code}
                  </CardTitle>
                  <Badge
                    variant={"secondary"}
                    size={"sm"}
                    className="font-normal"
                  >
                    {lobby.status}
                  </Badge>
                </CardHeader>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={(e) => onDelete(e, lobby.id)}
                    isLoading={deleteLobby.isPending}
                  >
                    <Trash2 />
                  </Button>
                  <Link
                    to="/admin/lobby/$lobby-id"
                    params={{ "lobby-id": lobby.id }}
                    className={buttonVariants({ size: "sm" })}
                  >
                    Join <ChevronRight />
                  </Link>
                </div>
              </Card>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </QueryState.Data>
    </QueryState>
  );
};

export { Lobbies };
