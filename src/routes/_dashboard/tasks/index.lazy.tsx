import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IconCheck, IconPlus, IconSearch } from "@tabler/icons-react";
import { Box, Button, TextInput } from "@mantine/core";

import { TASK } from "@/client/api";
import {
  AuthenticatedPage,
  PageError,
  PageHeader,
  PageLoading,
} from "@/components/page";
import {
  TaskDefaultView,
  TaskListView,
  TaskTableView,
  TaskModal,
} from "@/components/task";
import { Task } from "@/client/schema";
import { View } from "@/types/shared";
import { ViewSwitcher } from "@/components/view-switcher";
import { useDebouncedState } from "@mantine/hooks";
import { TaskEmptyView } from "@/components/task/views/task-empty";

const newTask: Task = {
  id: -1,
  name: "",
  priority: 1,
  due_date: undefined,
};

export const Tasks = () => {
  const [tasksFilter, setTaskFilter] = useDebouncedState("", 200);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [view, setView] = useState<View>("default");

  const { data: tasks, status } = useQuery({
    queryKey: ["tasks"],
    queryFn: TASK.getTasks.queryFn,
    select: (data) => ({
      data: data.data.filter((t) =>
        t.name.toUpperCase().includes(tasksFilter.toUpperCase()),
      ),
    }),
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
        <TextInput
          leftSection={<IconSearch size={18} />}
          defaultValue={tasksFilter}
          placeholder="Filter by name"
          onChange={(e) => setTaskFilter(e.target.value)}
        />
        <ViewSwitcher view={view} onChange={setView} />
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
        <>
          {view === "default" && <TaskDefaultView tasks={tasks.data} />}
          {view === "list" && <TaskListView tasks={tasks.data} />}
          {view === "table" && <TaskTableView tasks={tasks.data} />}
        </>
      )}

      {/* TODO: better empty tasks view */}
      {status === "success" &&
        tasks &&
        tasks.data &&
        tasks.data.length === 0 && <TaskEmptyView />}

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
