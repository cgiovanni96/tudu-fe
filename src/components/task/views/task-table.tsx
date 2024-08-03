import { ActionIcon, Menu, Table } from "@mantine/core";

import { formatDueDate } from "@/utilities";
import { TaskPriority } from "../task-priority";
import { SharedTaskViewProps } from "../types";

import classes from "./task-view.module.css";
import {
  IconArrowUp,
  IconCircleCheck,
  IconMenu,
  IconX,
} from "@tabler/icons-react";

export const TaskTableView = (props: SharedTaskViewProps) => {
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
                    leftSection={<IconArrowUp size={18} />}
                    onClick={() => props.selectTask(task)}
                  >
                    Open
                  </Menu.Item>

                  <Menu.Item leftSection={<IconCircleCheck size={18} />}>
                    Complete
                  </Menu.Item>

                  <Menu.Item leftSection={<IconX color="red" size={18} />}>
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
