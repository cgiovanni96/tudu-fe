import { TaskDefaultView } from "./views/task-default";
import { TaskEmptyView } from "./views/task-empty";
import { TaskListView } from "./views/task-list";
import { TaskSingleView } from "./views/task-single";
import { TaskTableView } from "./views/task-table";

export { TaskCompleteIcon } from "./task-complete-icon";
export { TaskModal } from "./task-modal";
export { TaskActions } from "./task-actions";

export const TaskView = {
  Default: TaskDefaultView,
  List: TaskListView,
  Table: TaskTableView,
  Empty: TaskEmptyView,
  Single: TaskSingleView,
};
