import { MantineColor } from "@mantine/core";

export type PriorityOption = {
  color: MantineColor;
  label: string;
  value: "high" | "medium" | "low";
};

export const priorities: Array<PriorityOption> = [
  { color: "red", label: "High", value: "high" },
  { color: "yellow", label: "Medium", value: "medium" },
  { color: "teal", label: "Low", value: "low" },
];
