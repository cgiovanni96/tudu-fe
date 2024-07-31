import { SCHEDULERS } from "@/client/api/scheduler";
import { AuthenticatedPage, PageHeader } from "@/components/page";
import { Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";

const SchedulerTasks = () => {
  const { data } = useQuery(SCHEDULERS.getScheduledTasks);

  return (
    <AuthenticatedPage title="Scheduled Tasks">
      <PageHeader title="Scheduled Tasks" />

      <Stack>
        {data?.map((item) => (
          <Group>
            <Text fw="bold">{item.task_name}</Text>
            <Text>{dayjs(item.scheduled_time).format("DD/MM/YYYY HH:mm")}</Text>
          </Group>
        ))}
      </Stack>
    </AuthenticatedPage>
  );
};

export const Route = createLazyFileRoute("/_dashboard/admin/scheduler/tasks")({
  component: SchedulerTasks,
});
