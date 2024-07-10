import {
  ActionIcon,
  ActionIconProps,
  ElementProps,
  MantineColorScheme,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";

import { match } from "@/utilities/match";
import { IconDevicesPc, IconMoon, IconSun } from "@tabler/icons-react";

type ColorSchemeTogglerProps = Omit<
  ActionIconProps,
  "children" | "c" | "onClick" | "size"
> &
  ElementProps<"button", keyof ActionIconProps>;

export function ColorSchemeToggler(props: ColorSchemeTogglerProps) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const { label, icon: Icon } = match(
    [colorScheme === "auto", { label: "System", icon: IconDevicesPc }],
    [colorScheme === "dark", { label: "Dark", icon: IconMoon }],
    [colorScheme === "light", { label: "Light", icon: IconSun }],
    [true, { label: "Dark", icon: IconMoon }],
  );

  const handleSchemeChange = () => {
    const nextColorScheme = match<MantineColorScheme>(
      [colorScheme === "auto", "dark"],
      [colorScheme === "dark", "light"],
      [colorScheme === "light", "auto"],
      [true, "dark"],
    );

    setColorScheme(nextColorScheme);
  };

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="transparent"
        c="inherit"
        onClick={handleSchemeChange}
        {...props}
      >
        <Icon size="100%" />
      </ActionIcon>
    </Tooltip>
  );
}
