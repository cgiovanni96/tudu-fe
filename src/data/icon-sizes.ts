export type IconSizesType = "xs" | "sm" | "md" | "lg";

export const iconSizes: Record<IconSizesType, number> = {
  xs: 12,
  sm: 18,
  md: 22,
  lg: 24,
} as const;
