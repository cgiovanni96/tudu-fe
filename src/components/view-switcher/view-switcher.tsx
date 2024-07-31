import { View } from "@/types/shared";
import { Group, Select, SelectProps } from "@mantine/core";
import { getViewIcon, viewTypes } from "./view.data";
import { IconCheck } from "@tabler/icons-react";

import classes from "./view-switcher.module.css";

type Props = {
  view: View;
  onChange: (view: View) => void;
};

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 18,
};

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => {
  const Icon = getViewIcon(option.value as View);

  return (
    <Group flex="1" gap="xs">
      <Icon {...iconProps} />
      {option.label}
      {checked && (
        <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />
      )}
    </Group>
  );
};

export const ViewSwitcher = (props: Props) => {
  const Icon = getViewIcon(props.view);

  return (
    <Select
      leftSection={<Icon {...iconProps} />}
      data={viewTypes}
      value={props.view}
      clearable={false}
      onChange={(value) => value && props.onChange(value as View)}
      renderOption={renderSelectOption}
      classNames={{ input: classes.switcherInput }}
    />
  );
};
