import { Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import classes from "./kanban.module.css";

type BaseRecord = {
  id: number;
  name: string;
  description?: string;
};

type Props<TData extends BaseRecord> = {
  data: TData;
  type: string;
  isHovered?: boolean;
  onClick?: () => void;
  onClickDelete?: (id: number) => Promise<void>;
};

export const KanbanCard = <TData extends BaseRecord>(props: Props<TData>) => {
  return (
    <Card onClick={props.onClick}>
      <Stack>
        <Group justify="space-between" h={28} align="center" mb="sm">
          <Title w="75%" order={6}>
            {props.data.name}
          </Title>
          <Box
            onClick={() => console.log("hello")}
            className={classes.cardIcon}
          >
            {props.isHovered && (
              <IconTrash
                size={22}
                color="red"
                onClick={() =>
                  props.onClickDelete && props.onClickDelete(props.data.id)
                }
              />
            )}{" "}
          </Box>
        </Group>
        <Text c="dimmed" fz="sm" lineClamp={2}>
          {props.data.description}
        </Text>

        <Group gap="0.25rem"></Group>
      </Stack>
    </Card>
  );
};
