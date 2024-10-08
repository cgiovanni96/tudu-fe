import { Block } from "@blocknote/core";

export type TaskContent = Array<Block>;

export type Task = {
  id: number;
  name: string;
  description?: string;
  content?: TaskContent;
  due_date?: TaskDueDate;
  priority: 0 | 1 | 2;
};

export type TaskDueDate = {
  due_date: string;
  hour_included: boolean;
  remainder_date: string;
  remainder_value: string;
};

export type User = {
  id: number;
  created_at: string;
  email: string;
  email_verified_at: string | null;
  name: string;
  updated_at: string;
};

export type ScheduledTask = {
  id: number;
  scheduled_time: string;
  task_id: number;
  task_name: string;
};
