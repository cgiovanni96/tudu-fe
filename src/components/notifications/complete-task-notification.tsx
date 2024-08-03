import { TASK } from "@/client/api";
import { Button, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  taskId: number;
};

export const CompleteTaskNotification = (props: Props) => {
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
