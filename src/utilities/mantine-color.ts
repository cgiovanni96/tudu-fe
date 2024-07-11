import { MantineColor } from "@mantine/core";

export const generateMantineColor = (color: MantineColor): string =>
  `var(--mantine-color-${color}-filled)`;
