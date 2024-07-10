import { z } from "zod";

export const addTaskSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(1),
  description: z.string().optional(),
  priority: z.string(),
  due_date: z.optional(z.string()),
  hour_included: z.optional(z.boolean()),
  remainder_date: z.optional(z.string()),
  remainder_value: z.optional(z.string()),
});

export type AddTaskDto = z.infer<typeof addTaskSchema>;
