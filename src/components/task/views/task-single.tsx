import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { Box, Button, Group, Loader, Modal, TextInput } from "@mantine/core";

import { TASK } from "@/client/api";
import { TaskContent } from "@/client/schema";
import { Editor } from "@/components/editor";

import classes from "./task-view.module.css";
import { useQuery } from "@tanstack/react-query";

type Props = {
  taskId?: number;
  open: boolean;
  onClose: () => void;
};

const TaskSingleTitle = (props: { title: string }) => {
  return (
    <TextInput
      defaultValue={props.title}
      readOnly
      classNames={{
        input: `${classes.modalNudeInput} ${classes.modalNudeTitle}`,
      }}
    />
  );
};

export const TaskSingleView = (props: Props) => {
  const { data: task } = useQuery(TASK.QUERIES.getTask(props.taskId));

  const [taskContent, setTaskContent] = useState<TaskContent | undefined>(
    undefined,
  );

  const updateMutation = TASK.MUTATIONS.useUpdateTaskMutation();

  const onCloseModal = () => {
    props.onClose();
  };

  const onSaveModal = async () => {
    if (!task) return;

    await updateMutation.mutateAsync({
      id: task.data.id,
      dto: {
        name: task.data.name,
        content: JSON.stringify(taskContent),
      },
    });
    props.onClose();
  };

  return (
    <Modal
      opened={props.open}
      onClose={onCloseModal}
      title={task ? <TaskSingleTitle title={task.data.name} /> : <Loader />}
      size="70%"
      classNames={{
        body: classes.modalBody,
      }}
    >
      {task && (
        <>
          <Box flex={1}>
            <Editor
              initialContent={task?.data.content}
              onChange={setTaskContent}
            />
          </Box>

          <Group justify="end">
            <Button
              variant="subtle"
              leftSection={<IconCheck />}
              onClick={onSaveModal}
              loading={updateMutation.status === "pending"}
              disabled={!task}
            >
              Save
            </Button>
          </Group>
        </>
      )}
    </Modal>
  );
};
