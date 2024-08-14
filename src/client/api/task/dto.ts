import { z } from "zod";

export const addTaskSchema = z.object({
  id: z.optional(z.number()),
  name: z.string().min(1),
  description: z.string().optional(),
  priority: z.number().lte(2).gte(0),
  due_date: z.optional(z.string()),
  hour_included: z.optional(z.boolean()),
  remainder_date: z.optional(z.string()),
  remainder_value: z.optional(z.string()),
});

export type AddTaskDto = z.infer<typeof addTaskSchema>;

export const updateTaskSchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
    priority: z.number().lte(2).gte(0),
    due_date: z.string(),
    content: z.string(),
    hour_included: z.boolean(),
    remainder_date: z.string(),
    remainder_value: z.string(),
  })
  .partial();

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
