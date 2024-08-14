import { ActionIcon, Card, Grid, Group, Text } from "@mantine/core";
import {
  IconCheck,
  IconChevronRight,
  IconHourglassEmpty,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";

import { SCHEDULER } from "@/client/api";
import { Page } from "@/components/page";

const SchedulerDashboard = () => {
  const { data } = useQuery(SCHEDULER.QUERIES.getSchedulerCounts);

  const router = useRouter();

  return (
    <Page.Authenticated title="Scheduler Dashboard">
      <Page.Header
        icon={<IconHourglassEmpty />}
        title="Scheduler Dashboard"
        breadcrumbs={[{ label: "Admin" }, { label: "Scheduler Dashboard" }]}
      />
      <Grid>
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Group justify="space-between">
                <Group gap="sm">
                  <IconCheck />
                  <Text fw={600}>Tasks</Text>
                </Group>

                <ActionIcon
                  onClick={() =>
                    router.navigate({ to: "/admin/scheduler/tasks" })
                  }
                >
                  <IconChevronRight />
                </ActionIcon>
              </Group>
            </Card.Section>

            <Card.Section mt="sm" p="md">
              There are {data?.tasks} remainder for tasks scheduled.
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Page.Authenticated>
  );
};

export const Route = createLazyFileRoute("/_dashboard/admin/scheduler/")({
  component: SchedulerDashboard,
});
