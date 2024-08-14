import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { ActionIcon, Loader } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { TASK } from "@/client/api";
import { Notifications } from "@/components/notifications";

type Props = {
  taskId: number;
};

export const TaskCompleteIcon = (props: Props) => {
  const { ref, hovered } = useHover<HTMLButtonElement>();

  const mutation = TASK.MUTATIONS.useCompleteTaskMutation();

  const onClickComplete = async () => {
    await mutation.mutateAsync(props.taskId);
    notifications.show({
      message: <Notifications.CompleteTask taskId={props.taskId} />,
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
