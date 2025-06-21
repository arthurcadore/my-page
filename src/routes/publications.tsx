import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/publications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/publications"!</div>
}
