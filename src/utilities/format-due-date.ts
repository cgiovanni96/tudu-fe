import { DueDateInfo } from "@/components/due-date-picker";
import dayjs from "dayjs";

export const formatDueDate = (
  dueDate: DueDateInfo,
  type: "due_date" | "remainder_date",
): string => {
  const format = dueDate.hour_included ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY";
  return dayjs(dueDate[type]).format(format);
};
