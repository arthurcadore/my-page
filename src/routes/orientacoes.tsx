import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orientacoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/orientacoes"!</div>
}
