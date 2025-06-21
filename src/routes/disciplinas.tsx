import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/disciplinas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/disciplinas"!</div>
}
