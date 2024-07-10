import { Button, Card, Flex, FlexProps, Group, Title } from "@mantine/core";

interface Props extends Pick<FlexProps, "children" | "w" | "gap"> {
  id: string;
  title: string;
  onClickAdd?: () => void;
}

export const KanbanColumn = ({
  children,
  title,
  w = "18rem",
  onClickAdd,
  gap = "sm",
}: Props) => {
  return (
    <Card p="sm">
      <Group justify="space-between" mb="lg">
        <Title order={4}>{title}</Title>
      </Group>

      <Flex direction="column" w={w} gap={gap} mih="4rem">
        {children}
      </Flex>

      <Button fullWidth variant="subtle" mt="md" onClick={onClickAdd}>
        Add card
      </Button>
    </Card>
  );
};
