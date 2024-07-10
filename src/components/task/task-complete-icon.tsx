import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { ActionIcon, Loader } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { TASK } from "@/client/api";
import { notifications } from "@mantine/notifications";

type Props = {
  taskId: number;
};

export const TaskCompleteIcon = (props: Props) => {
  const { ref, hovered } = useHover<HTMLButtonElement>();
  const client = useQueryClient();

  const mutation = TASK.useCompleteMutation(client);

  const onClickComplete = async () => {
    const response = await mutation.mutateAsync(props.taskId);
    console.log("response", response);
    notifications.show({ message: "Task complete!" });
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
