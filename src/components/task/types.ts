import { Task } from "@/client/schema";

export type SharedTaskViewProps = {
  tasks: Array<Task>;
  selectTask: (task: Task) => void;
};
