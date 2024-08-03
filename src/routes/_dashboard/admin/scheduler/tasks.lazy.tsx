import { ActionIcon, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IconHourglass, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";

import { SCHEDULERS } from "@/client/api/scheduler";

import { Page } from "@/components/page";

const SchedulerTasks = () => {
  const { data } = useQuery(SCHEDULERS.getScheduledTasks);

  const mutation = SCHEDULERS.useDeleteScheduledTask();

  const onClickDelete = async (id: number) => {
    await mutation.mutateAsync(id);
  };

  return (
    <Page.Authenticated title="Scheduled Tasks">
      <Page.Header
        icon={<IconHourglass />}
        title="Scheduled Tasks"
        breadcrumbs={[
          { label: "Admin" },
          { href: "/admin/scheduler", label: "Scheduler Dashboard" },
          { label: "Scheduled Tasks" },
        ]}
      />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Remainder Time</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.task_name}</Table.Td>
              <Table.Td>
                {dayjs(item.scheduled_time).format("DD/MM/YYYY HH:mm")}
              </Table.Td>
              <Table.Td styles={{ td: { width: "50px" } }}>
                <ActionIcon color="red" onClick={() => onClickDelete(item.id)}>
                  <IconX color="var(--mantine-color-red-6)" />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Page.Authenticated>
  );
};

export const Route = createLazyFileRoute("/_dashboard/admin/scheduler/tasks")({
  component: SchedulerTasks,
});
