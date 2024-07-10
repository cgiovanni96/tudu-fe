import { Flex, FlexProps, ScrollArea } from "@mantine/core";

type Props = Pick<FlexProps, "children" | "gap">;

export const KanbanBoard = ({ children, gap = "md" }: Props) => {
  return (
    <ScrollArea>
      <Flex gap={gap} align="flex-start">
        {children}
      </Flex>
    </ScrollArea>
  );
};
