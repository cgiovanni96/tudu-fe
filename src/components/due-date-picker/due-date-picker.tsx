import {
  Button,
  Group,
  Popover,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { DatePicker, DateValue, TimeInput } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { Remainder } from "./remainder";
import { RemainderMapKeys, RemainderMapValues, remainderMap } from "@/data";

export type DueDateInfo = {
  due_date?: string;
  hour_included?: boolean;
  remainder_date?: string;
  remainder_value?: string;
};

type Props = {
  dueDateInfo?: DueDateInfo;
  onChange: (dueDateInfo?: DueDateInfo) => void;
};

export const DueDatePicker = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const format = props.dueDateInfo?.hour_included
    ? "DD/MM/YYYY HH:mm"
    : "DD/MM/YYYY";

  const onChangeDate = (date: DateValue) => {
    const remainder = getRemainder(
      date?.toISOString(),
      props.dueDateInfo?.remainder_value
        ? remainderMap[props.dueDateInfo.remainder_value as RemainderMapKeys]
        : undefined,
      props.dueDateInfo?.remainder_value as RemainderMapKeys | undefined,
    );

    props.onChange({
      ...props.dueDateInfo,
      ...remainder,
      due_date: date?.toISOString() || undefined,
    });
  };

  const getRemainder = (
    date?: string,
    remainder_value?: RemainderMapValues,
    remainder_key?: RemainderMapKeys,
  ) => {
    if (!date || !remainder_value) {
      return {
        remainder_date: undefined,
        remainder_value: undefined,
      };
    }

    if (remainder_value || remainder_key) {
      const val = remainder_value || remainderMap[remainder_key!];

      const remainder_date = dayjs(date)
        .subtract(val.amount, val.unit)
        .toISOString();

      return {
        remainder_date,
        remainder_value: remainder_key,
      };
    }

    return {
      remainder_date: undefined,
      remainder_value: undefined,
    };
  };

  const onChangeRemainder = (
    remainder_value?: RemainderMapValues,
    remainder_key?: RemainderMapKeys,
  ) => {
    const remainder = getRemainder(
      props.dueDateInfo?.due_date,
      remainder_value,
      remainder_key,
    );
    props.onChange && props.onChange({ ...props.dueDateInfo, ...remainder });
  };

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <TextInput
          onClick={() => setOpened(true)}
          value={
            props.dueDateInfo?.due_date
              ? dayjs(props.dueDateInfo.due_date).format(format)
              : ""
          }
          label="Due Date"
          rightSection={
            props.dueDateInfo?.due_date && (
              <IconX
                size={14}
                onClick={() => props.onChange && props.onChange(undefined)}
              />
            )
          }
        />
      </Popover.Target>

      <Popover.Dropdown>
        <Stack>
          <DatePicker
            value={
              !props.dueDateInfo?.due_date
                ? undefined
                : new Date(props.dueDateInfo.due_date)
            }
            onChange={onChangeDate}
          />

          {props.dueDateInfo?.hour_included && props.dueDateInfo.due_date && (
            <TimeInput
              value={dayjs(props.dueDateInfo.due_date).format("HH:mm")}
              onChange={(e) => {
                const d = dayjs(props.dueDateInfo!.due_date).toDate();

                d.setHours(parseInt(e.currentTarget.value.split(":")[0]));
                d.setMinutes(parseInt(e.currentTarget.value.split(":")[1]));

                onChangeDate(d);
              }}
            />
          )}

          <Switch
            label="Include Hours"
            checked={props.dueDateInfo?.hour_included || false}
            onChange={(event) =>
              props.onChange({
                ...props.dueDateInfo,
                hour_included: event.currentTarget.checked,
              })
            }
          />

          <Remainder
            onChange={onChangeRemainder}
            defaultValue={
              props.dueDateInfo?.remainder_value as RemainderMapKeys | undefined
            }
          />

          <Group>
            <Button
              variant="outline"
              onClick={() => {
                props.onChange(undefined);
                setOpened(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpened(false);
              }}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
