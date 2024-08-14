import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useMemo } from "react";

export const useResolveColorScheme = (): "light" | "dark" => {
  const defaultColorScheme = useColorScheme();
  const { colorScheme } = useMantineColorScheme();

  const resolved = useMemo(() => {
    if (colorScheme === "auto") return defaultColorScheme;
    return colorScheme as "light" | "dark";
  }, [defaultColorScheme, colorScheme]);

  return resolved;
};
