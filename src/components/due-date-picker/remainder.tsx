import {
  RemainderMapKeys,
  RemainderMapValues,
  remainderMap,
  remainderOptions,
} from "@/data";
import { Select } from "@mantine/core";
import { useMemo, useState } from "react";

type Props = {
  disabled?: boolean;
  defaultValue?: RemainderMapKeys;
  hour_included?: boolean;

  onChange: (
    remainder_value?: RemainderMapValues,
    remainder_key?: RemainderMapKeys,
  ) => void;
};

export const Remainder = (props: Props) => {
  const [remainder, setRemainder] = useState<RemainderMapKeys | undefined>(
    props.defaultValue,
  );

  const options = useMemo(() => {
    const opts = [{ group: "Daily", items: remainderOptions.dayly }];
    if (props.hour_included) {
      opts.push({ group: "Hourly", items: remainderOptions.hourly });
    }
    return opts;
  }, [props.hour_included]);

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
      data={options}
      comboboxProps={{ withinPortal: false }}
    />
  );
};
