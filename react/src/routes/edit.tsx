import PendingTable from '@/components/pending-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PendingTable />
}
