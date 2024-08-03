import {
  ActionIcon,
  Button,
  Stack,
  TextInput,
  Drawer,
  Group,
} from "@mantine/core";
import { ViewSwitcher } from "../view-switcher";
import { IconMenu2, IconPlus, IconSearch } from "@tabler/icons-react";
import { View } from "@/types/shared";
import { Task } from "@/client/schema";

import { newTask } from "./utils";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

type Props = {
  tasksFilter: string;
  view: View;

  onChangeFilter: (filter: string) => void;
  onChangeView: (view: View) => void;
  onClickAdd: (task: Task) => void;
};
export const TaskActions = (props: Props) => {
  const matches = useMediaQuery("(min-width: 56.25em)");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {matches ? (
        <>
          <TextInput
            leftSection={<IconSearch size={18} />}
            defaultValue={props.tasksFilter}
            placeholder="Filter by name"
            onChange={(e) => props.onChangeFilter(e.target.value)}
          />
          <ViewSwitcher view={props.view} onChange={props.onChangeView} />
          <Button
            leftSection={<IconPlus />}
            variant="light"
            onClick={() => props.onClickAdd({ ...newTask })}
          >
            Add Task
          </Button>
        </>
      ) : (
        <>
          <Group>
            <ActionIcon
              variant="light"
              onClick={() => props.onClickAdd({ ...newTask })}
            >
              <IconPlus />
            </ActionIcon>

            <ActionIcon onClick={open}>
              <IconMenu2 />
            </ActionIcon>
          </Group>

          <Drawer opened={opened} onClose={close} title="Options">
            <Stack>
              <ViewSwitcher view={props.view} onChange={props.onChangeView} />
              <TextInput
                leftSection={<IconSearch size={18} />}
                defaultValue={props.tasksFilter}
                placeholder="Filter by name"
                onChange={(e) => props.onChangeFilter(e.target.value)}
              />
            </Stack>
          </Drawer>
        </>
      )}
    </>
  );
};
