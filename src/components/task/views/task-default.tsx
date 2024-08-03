import { Divider, Group, Stack, Text, Badge } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";

import { TaskPriority } from "../task-priority";
import { TaskCompleteIcon } from "../task-complete-icon";
import type { SharedTaskViewProps } from "../types";

import classes from "../task.module.css";
import { iconSizes } from "@/data";

export const TaskDefaultView = (props: SharedTaskViewProps) => {
  return (
    <Stack>
      {props.tasks.map((task) => (
        <Stack key={task.id} gap="sm">
          <Group align="start">
            <TaskCompleteIcon taskId={task.id} />
            <Stack gap="xs">
              <Text onClick={() => props.selectTask(task)}>{task.name}</Text>
              <Text className={classes.taskDescription}>
                {task.description}
              </Text>
              <Group gap="md">
                <TaskPriority priority={task.priority} />

                {task.due_date && (
                  <Badge
                    variant="transparent"
                    color="gray"
                    p="0"
                    leftSection={<IconCalendar size={iconSizes.sm} />}
                  >
                    {dayjs(task.due_date.due_date).format(
                      task.due_date.hour_included
                        ? "DD/MM/YYYY HH:mm"
                        : "DD/MM/YYYY",
                    )}
                  </Badge>
                )}
              </Group>
            </Stack>
          </Group>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};
