import { useMemo, useState } from "react";

import { Task } from "@/client/schema";
import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";

import { AddTaskDto, addTaskSchema, TASK } from "@/client/api/task";
import { useQueryClient } from "@tanstack/react-query";
import { DueDatePicker, DueDateInfo } from "../due-date-picker";
import { PriorityPicker } from "../priority-picker";

type Props = ModalProps & {
  initialValue?: Task;
};

export const TaskModal = ({ initialValue, onClose, ...props }: Props) => {
  const type = useMemo(
    () => (initialValue?.id && initialValue.id >= 0 ? "edit" : "create"),
    [initialValue],
  );

  const client = useQueryClient();
  const addTaskMutation = TASK.useAddTaskMutation(client);

  const [dueDateInfo, setDueDateInfo] = useState<DueDateInfo | undefined>({
    due_date: initialValue?.due_date?.due_date
      ? initialValue.due_date?.due_date
      : undefined,
    hour_included: initialValue?.due_date?.hour_included || false,
    remainder_date: initialValue?.due_date?.remainder_date
      ? initialValue.due_date.remainder_date
      : undefined,
    remainder_value: initialValue?.due_date?.remainder_value || undefined,
  });

  const form = useForm<AddTaskDto>({
    mode: "uncontrolled",
    initialValues: {
      id: type === "edit" ? initialValue!.id : undefined,
      name: initialValue?.name || "",
      description: initialValue?.description || "",
      priority: initialValue?.priority || 1,
      due_date: initialValue?.due_date?.due_date
        ? initialValue.due_date?.due_date
        : undefined,
      hour_included: initialValue?.due_date?.hour_included || false,
      remainder_date: initialValue?.due_date?.remainder_date
        ? initialValue.due_date.remainder_date
        : undefined,
      remainder_value: initialValue?.due_date?.remainder_value || undefined,
    },
    validate: zodResolver(addTaskSchema),
  });

  const closeModal = () => {
    form.reset();
    onClose();
  };

  const onSubmiteSave = async (data: AddTaskDto) => {
    await addTaskMutation.mutateAsync({ ...data, ...dueDateInfo });
    closeModal();
  };

  return (
    <Modal onClose={closeModal} {...props} size="lg">
      <form onSubmit={form.onSubmit(onSubmiteSave)}>
        <Stack>
          {type === "edit" && (
            <TextInput
              label="ID"
              placeholder="ID"
              disabled={true}
              key={form.key("id")}
              {...form.getInputProps("id")}
            />
          )}

          <TextInput
            label="Name"
            placeholder="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <Textarea
            placeholder="Task description"
            label="Description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />

          <Group>
            <PriorityPicker
              key={form.key("priority")}
              {...form.getInputProps("priority")}
            />

            <DueDatePicker
              dueDateInfo={dueDateInfo}
              onChange={setDueDateInfo}
            />
          </Group>

          <Group justify="flex-end">
            <Button
              type="submit"
              leftSection={<IconDeviceFloppy />}
              loading={addTaskMutation.isPending}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
