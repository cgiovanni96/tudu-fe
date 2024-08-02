import { Task } from "@/client/schema";
import { Table } from "@mantine/core";
import { TaskPriority } from "../task-priority";

import classes from "./task-view.module.css";

type Props = {
  tasks: Array<Task>;
};

export const TaskTableView = (props: Props) => {
  return (
    <Table withTableBorder withColumnBorders withRowBorders>
      <Table.Thead>
        <Table.Tr className={classes.tableHeaderRow}>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Priority</Table.Th>
          <Table.Th>Due Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.tasks.map((task) => (
          <Table.Tr key={task.id}>
            <Table.Td>{task.name}</Table.Td>
            <Table.Td>{task.description}</Table.Td>
            <Table.Td>
              <TaskPriority priority={task.priority} />
            </Table.Td>
            <Table.Td>{task.due_date?.due_date || ""}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
