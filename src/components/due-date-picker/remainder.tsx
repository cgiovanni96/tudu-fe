import {
  RemainderMapKeys,
  RemainderMapValues,
  remainderMap,
  remainderOptions,
} from "@/data";
import { Select } from "@mantine/core";
import { useState } from "react";

type Props = {
  onChange: (
    remainder_value?: RemainderMapValues,
    remainder_key?: RemainderMapKeys,
  ) => void;
  disabled?: boolean;
  defaultValue?: RemainderMapKeys;
};

export const Remainder = (props: Props) => {
  const [remainder, setRemainder] = useState<RemainderMapKeys | undefined>(
    props.defaultValue,
  );

  return (
    <Select
      label="Remainder"
      value={remainder}
      disabled={props.disabled}
      clearable
      onChange={(value) => {
        setRemainder(value as RemainderMapKeys);
        props.onChange(
          remainderMap[value as RemainderMapKeys],
          value as RemainderMapKeys,
        );
      }}
      data={remainderOptions}
      comboboxProps={{ withinPortal: false }}
    />
  );
};
