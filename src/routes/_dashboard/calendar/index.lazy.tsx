import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/calendar/')({
  component: () => <div>Hello /_dashboard/calendar/!</div>
})