import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Loader, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { TASK } from "@/client/api";
import { notifications } from "@mantine/notifications";

type Props = {
  taskId: number;
};

const CompleteTaskNotification = (props: Props) => {
  const client = useQueryClient();
  const mutation = TASK.useCompleteMutation(client);

  const onClickUndo = async () => {
    await mutation.mutateAsync(props.taskId);
    notifications.clean();
  };

  return (
    <Group justify="space-between">
      <Text>Task complete!</Text>
      <Button variant="light" size="sm" fs="xs" onClick={onClickUndo}>
        Undo
      </Button>
    </Group>
  );
};

export const TaskCompleteIcon = (props: Props) => {
  const { ref, hovered } = useHover<HTMLButtonElement>();
  const client = useQueryClient();

  const mutation = TASK.useCompleteMutation(client);

  const onClickComplete = async () => {
    await mutation.mutateAsync(props.taskId);
    notifications.show({
      message: <CompleteTaskNotification taskId={props.taskId} />,
    });
  };

  return (
    <ActionIcon ref={ref} onClick={onClickComplete}>
      {mutation.isPending ? (
        <Loader />
      ) : hovered ? (
        <IconCircleCheck />
      ) : (
        <IconCircle />
      )}
    </ActionIcon>
  );
};
