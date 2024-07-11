import {
  Combobox,
  Group,
  Input,
  InputBase,
  Text,
  useCombobox,
} from "@mantine/core";
import { IconFlag } from "@tabler/icons-react";

import { generateMantineColor } from "@/utilities";
import { PriorityOption, priorities } from "@/data";
import { useState } from "react";

const SelectOption = (props: PriorityOption) => {
  return (
    <Group gap="sm">
      <IconFlag color={generateMantineColor(props.color)} size={18} />
      <Text fz="sm" fw={500}>
        {props.label}
      </Text>
    </Group>
  );
};

type Props = {
  defaultValue?: string;
  onChange: (value?: string) => void;
};

export const PriorityPicker = (props: Props) => {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption = priorities.find((item) => item.value === value);

  const options = priorities.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        props.onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label="Priority"
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
          w={150}
        >
          {selectedOption ? (
            <SelectOption {...selectedOption} />
          ) : (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
