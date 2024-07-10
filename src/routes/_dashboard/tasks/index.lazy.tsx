import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { Box, Button, Stack, Title } from "@mantine/core";

import { TASK } from "@/client/api";
import {
  AuthenticatedPage,
  PageError,
  PageHeader,
  PageLoading,
} from "@/components/page";
import { TaskList, TaskModal } from "@/components/task";
import { Task } from "@/client/schema";

const newTask: Task = {
  id: -1,
  name: "",
  priority: "medium",
  due_date: undefined,
};

export const Tasks = () => {
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const { data: tasks, status } = useQuery({
    queryKey: ["tasks"],
    queryFn: TASK.getTasks.queryFn,
  });

  return (
    <AuthenticatedPage title="Tasks">
      <PageHeader
        title={
          <>
            <IconCheck />
            <Box component="span" ml="sm">
              Tasks
            </Box>
          </>
        }
      >
        <Button
          leftSection={<IconPlus />}
          variant="light"
          onClick={() => setEditingTask({ ...newTask })}
        >
          Add Task
        </Button>
      </PageHeader>
      {status === "error" && <PageError />}
      {status === "pending" && <PageLoading />}
      {status === "success" && tasks && tasks.data && tasks.data.length > 0 && (
        <TaskList tasks={tasks.data} />
      )}

      {/* TODO: better empty tasks view */}
      {status === "success" &&
        tasks &&
        tasks.data &&
        tasks.data.length === 0 && (
          <Stack>
            <Title order={1}>No active tasks, add some.</Title>
          </Stack>
        )}

      <TaskModal
        opened={!!editingTask}
        onClose={() => setEditingTask(undefined)}
        title={editingTask && editingTask.id >= 0 ? "Edit Task" : "Create Task"}
        initialValue={editingTask}
      />
    </AuthenticatedPage>
  );
};

export const Route = createLazyFileRoute("/_dashboard/tasks/")({
  component: () => <Tasks />,
});
