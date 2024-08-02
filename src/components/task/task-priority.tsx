import { priorities } from "@/data";
import { generateMantineColor } from "@/utilities";
import { Badge } from "@mantine/core";
import { IconFlag } from "@tabler/icons-react";
import { useMemo } from "react";

type Props = {
  priority: 0 | 1 | 2;
};

export const TaskPriority = (props: Props) => {
  // const priority =  priorities.find((item) => item.value === +props.priority);

  const priority = useMemo(
    () => priorities.find((item) => item.value === +props.priority),
    [props.priority],
  );

  return (
    <>
      {priority ? (
        <Badge
          leftSection={
            <IconFlag color={generateMantineColor(priority.color)} size={18} />
          }
          color={generateMantineColor(priority.color)}
          variant="transparent"
          p="0"
        >
          {priority.label}
        </Badge>
      ) : (
        <></>
      )}
    </>
  );
};
