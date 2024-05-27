export type Task = {
  id: number;
  name: string;
  description?: string;
  is_completed: boolean;
};

export type User = {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
};
