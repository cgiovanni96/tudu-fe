import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { IconCheck, IconPlus, IconSearch } from "@tabler/icons-react";
import { Button, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

import { TASK } from "@/client/api";
import { Task } from "@/client/schema";
import { View } from "@/types/shared";

import { Page } from "@/components/page";
import { TaskView, TaskModal } from "@/components/task";
import { ViewSwitcher } from "@/components/view-switcher";

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
    <Page.Authenticated title="Tasks">
      <Page.Header
        icon={<IconCheck />}
        title={"Tasks"}
        breadcrumbs={[{ label: "Apps" }, { label: "Tasks" }]}
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
      </Page.Header>
      {status === "error" && <Page.Error />}
      {status === "pending" && <Page.Loading />}
      {status === "success" && tasks && tasks.data && tasks.data.length > 0 && (
        <>
          {view === "default" && <TaskView.Default tasks={tasks.data} />}
          {view === "list" && <TaskView.List tasks={tasks.data} />}
          {view === "table" && <TaskView.Table tasks={tasks.data} />}
        </>
      )}

      {status === "success" &&
        tasks &&
        tasks.data &&
        tasks.data.length === 0 && <TaskView.Empty />}

      <TaskModal
        opened={!!editingTask}
        onClose={() => setEditingTask(undefined)}
        title={editingTask && editingTask.id >= 0 ? "Edit Task" : "Create Task"}
        initialValue={editingTask}
      />
    </Page.Authenticated>
  );
};

export const Route = createLazyFileRoute("/_dashboard/tasks/")({
  component: () => <Tasks />,
});
