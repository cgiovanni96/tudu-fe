import { Stack, Title } from "@mantine/core";
import { IconBucketDroplet } from "@tabler/icons-react";

export const TaskEmptyView = () => {
  return (
    <Stack w="100%" h="100%" align="center" justify="center" flex="1">
      <Title order={1}>
        <IconBucketDroplet size={128} />
      </Title>
      <Title order={1}>No active tasks, add some.</Title>
    </Stack>
  );
};
