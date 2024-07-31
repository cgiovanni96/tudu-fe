import { Task } from "@/client/schema";
import { Divider, Group, Stack, Text } from "@mantine/core";
import { TaskCompleteIcon } from "../task-complete-icon";

type Props = {
  tasks: Array<Task>;
};

export const TaskListView = (props: Props) => {
  return (
    <Stack>
      {props.tasks.map((task) => (
        <Stack key={task.id} gap="sm">
          <Group align="start">
            <TaskCompleteIcon taskId={task.id} />
            <Text>{task.name}</Text>
          </Group>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};
