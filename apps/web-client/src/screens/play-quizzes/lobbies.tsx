import { QueryState } from "@/components/ui/query-state"
import { server } from "@/server/apis"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconSelector } from "@tabler/icons-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
type Props = {
  quizId: string
}

const Lobbies = ({ quizId }: Props) => {
  const lobbies = server.playQuiz.useListLobbies({ quizId })



  return (
    <QueryState {...lobbies} isEmpty={lobbies?.data?.length === 0}>
      <QueryState.Error />
      <QueryState.Data>
        <Collapsible >
          <CollapsibleTrigger asChild>
            <Button className="w-full justify-between" variant={"ghost"}>
              <span> Lobbies ({lobbies.data?.length})</span>
              <IconSelector />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent >
            {
              lobbies.data?.map((lobby) => (
                <Card key={lobby.id} className="p-2 flex flex-row justify-between items-center ">
                  <CardHeader className="flex items-center flex-1 ">
                    <CardTitle className="text-sm">
                      {lobby.name} - Code: {lobby.code}
                    </CardTitle>
                    <Badge variant={"secondary"} size={"sm"} className="font-normal">
                      {lobby.status}
                    </Badge>
                  </CardHeader>
                  <Link to="/admin/lobby/$lobby-id" params={{ "lobby-id": lobby.id }} className={buttonVariants({ size: "sm" })}>
                    Join <ChevronRight />
                  </Link>
                </Card>
              ))
            }
          </CollapsibleContent>
        </Collapsible>
      </QueryState.Data>
    </QueryState>
  )
}

export { Lobbies }