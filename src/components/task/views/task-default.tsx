import { Task } from "@/client/schema";
import { Divider, Group, Stack, Text, Badge } from "@mantine/core";
import { TaskCompleteIcon } from "../task-complete-icon";

import styles from "../task.module.css";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { TaskPriority } from "../task-priority";

type Props = {
  tasks: Array<Task>;
};

export const TaskDefaultView = (props: Props) => {
  return (
    <Stack>
      {props.tasks.map((task) => (
        <Stack key={task.id} gap="sm">
          <Group align="start">
            <TaskCompleteIcon taskId={task.id} />
            <Stack gap="xs">
              <Text>{task.name}</Text>
              <Text className={styles.taskDescription}>{task.description}</Text>
              <Group gap="md">
                <TaskPriority priority={task.priority} />

                {task.due_date && (
                  <Badge
                    variant="transparent"
                    color="gray"
                    p="0"
                    leftSection={<IconCalendar size={16} />}
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
