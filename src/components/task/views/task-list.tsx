import { Divider, Group, Stack, Text } from "@mantine/core";

import { TaskCompleteIcon } from "../task-complete-icon";
import type { SharedTaskViewProps } from "../types";

import classes from "./task-view.module.css";

export const TaskListView = (props: SharedTaskViewProps) => {
  return (
    <Stack>
      {props.tasks.map((task) => (
        <Stack key={task.id} gap="sm">
          <Group align="start">
            <TaskCompleteIcon taskId={task.id} />
            <Text
              onClick={() => props.selectTask(task.id)}
              className={classes.clickableName}
            >
              {task.name}
            </Text>
          </Group>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};
