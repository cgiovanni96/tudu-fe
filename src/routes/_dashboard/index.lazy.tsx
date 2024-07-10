import { TASK } from "@/client/api/task";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  const { data: tasks } = useQuery(TASK.getTasks);

  return <Stack>{JSON.stringify(tasks, null, 2)}</Stack>;
};

export const Route = createLazyFileRoute("/_dashboard/")({
  component: Index,
});
