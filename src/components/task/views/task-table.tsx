import { ActionIcon, Menu, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconArrowUp,
  IconCircleCheck,
  IconMenu,
  IconX,
} from "@tabler/icons-react";

import { formatDueDate } from "@/utilities";
import { TASK } from "@/client/api";
import { Notifications } from "@/components/notifications";

import { TaskPriority } from "../task-priority";
import { SharedTaskViewProps } from "../types";

import classes from "./task-view.module.css";
import { iconSizes } from "@/data";

export const TaskTableView = (props: SharedTaskViewProps) => {
  const mutation = TASK.useCompleteMutation();

  const onClickComplete = async (id: number) => {
    await mutation.mutateAsync(id);
    notifications.show({
      message: <Notifications.CompleteTask taskId={id} />,
    });
  };

  return (
    <Table withTableBorder withColumnBorders withRowBorders>
      <Table.Thead>
        <Table.Tr className={classes.tableHeaderRow}>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Due Date</Table.Th>
          <Table.Th>Priority</Table.Th>
          <Table.Th align="center" styles={{ th: { width: "50px" } }}>
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.tasks.map((task) => (
          <Table.Tr key={task.id}>
            <Table.Td>{task.name}</Table.Td>
            <Table.Td>{task.description}</Table.Td>
            <Table.Td>
              {task.due_date && task.due_date.due_date
                ? formatDueDate(task.due_date, "due_date")
                : ""}
            </Table.Td>
            <Table.Td>
              <TaskPriority priority={task.priority} />
            </Table.Td>

            <Table.Td align="center" styles={{ td: { width: "50px" } }}>
              <Menu>
                <Menu.Target>
                  <ActionIcon>
                    <IconMenu />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconArrowUp size={iconSizes.sm} />}
                    onClick={() => props.selectTask(task)}
                  >
                    Open
                  </Menu.Item>

                  <Menu.Item
                    leftSection={<IconCircleCheck size={iconSizes.sm} />}
                    onClick={() => onClickComplete(task.id)}
                  >
                    Complete
                  </Menu.Item>

                  <Menu.Item
                    leftSection={<IconX color="red" size={iconSizes.sm} />}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
