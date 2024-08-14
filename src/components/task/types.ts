import { Task } from "@/client/schema";

export type SharedTaskViewProps = {
  tasks: Array<Task>;
  selectTask: (taskId: number) => void;
};
