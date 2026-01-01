import { useSocket } from '@/server/ws/hooks'
import { MESSAGES } from '@/server/ws/play-quiz/messages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/lobby/$lobby-id')({
  component: RouteComponent,
})

function RouteComponent() {
  useSocket({
    events: [MESSAGES.JOIN_LOBBY]
  })
  return <div>Hello "/_admin/admin/lobby/$lobby-id"!</div>
}
