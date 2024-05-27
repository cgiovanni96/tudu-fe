import { TASK } from "@/client/api/task";
import { USER } from "@/client/api/user";
import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Input,
  Stack,
  Text,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const Index = () => {
  const client = useQueryClient();
  const { data, status, isFetching, ...query } = TASK.useTasksQuery();
  const mutation = TASK.useSaveMutation(client);

  const userMutation = USER.useCreateUser();
  const [tasks, setTasks] = useState<string>("");

  console.log("data", data, status, isFetching);

  const completed =
    data && !query.error ? data.data.filter((task) => task.is_completed) : [];
  const incomplete =
    data && !query.error ? data.data.filter((task) => !task.is_completed) : [];

  const saveTask = async () => {
    await mutation.mutateAsync({ name: tasks });
  };

  if (status === "pending" || isFetching) return <div>Loading...</div>;

  return (
    <Stack>
      <Group>
        <Input
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder="Task name"
        />
        <Button loading={mutation.isPending} onClick={saveTask}>
          Save
        </Button>

        <Button onClick={async () => await userMutation.mutateAsync()}>
          CreateUser
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={2} />
        <Grid.Col span={4}>
          <Stack w="400" mx="auto">
            {incomplete &&
              incomplete.map((task) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{task.name}</Text>
                    <Badge color="pink">
                      {task.is_completed ? "Completata" : "Da Completare"}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {task.description}
                  </Text>
                </Card>
              ))}
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack w="400" mx="auto">
            {completed &&
              completed.map((task) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{task.name}</Text>
                    <Badge color="pink">
                      {task.is_completed ? "Completata" : "Da Completare"}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {task.description}
                  </Text>
                </Card>
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={2} />
      </Grid>
    </Stack>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
