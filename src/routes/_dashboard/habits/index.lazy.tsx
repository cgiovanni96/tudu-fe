import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/habits/')({
  component: () => <div>Hello /_dashboard/habits/!</div>
})