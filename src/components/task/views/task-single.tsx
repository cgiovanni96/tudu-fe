import { Task } from "@/client/schema";
import { Modal, Stack } from "@mantine/core";

// TODO: is it better to pass the complete task, or only the id and then making a separate query?
type Props = {
  task?: Task;
  open: boolean;
  onClose: () => void;
};

export const TaskSingleView = (props: Props) => {
  return (
    <Modal
      opened={props.open}
      onClose={props.onClose}
      title={props.task?.name}
      styles={{
        title: {
          fontSize: 20,
        },
      }}
      size="xl"
    >
      <Stack>{JSON.stringify(props.task, null, 2)}</Stack>
    </Modal>
  );
};
