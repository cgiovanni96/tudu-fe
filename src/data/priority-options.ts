import { MantineColor } from "@mantine/core";

export type PriorityOption = {
  color: MantineColor;
  label: string;
  value: 0 | 1 | 2;
};

export const priorities: Array<PriorityOption> = [
  { color: "red", label: "High", value: 2 },
  { color: "yellow", label: "Medium", value: 1 },
  { color: "teal", label: "Low", value: 0 },
];
