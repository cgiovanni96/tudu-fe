export type Task = {
  id: number;
  name: string;
  description?: string;
  content?: string;
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
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
};

export type ScheduledTask = {
  id: string;
  scheduled_time: string;
  task_id: string;
  task_name: string;
};
