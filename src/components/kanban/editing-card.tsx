import { iconSizes } from "@/data";
import { Box, Button, Card, Input } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  cancel: () => void;
  add: (name: string) => Promise<void>;
  addPending: boolean;
};

export const EditingCard = ({ cancel, add, addPending }: Props) => {
  const [name, setName] = useState("");

  const onClickCancel = () => {
    setName("");
    cancel();
  };

  const onClickAdd = async () => {
    await add(name.trim());
    setName("");
    cancel();
  };

  return (
    <Card>
      <Input
        placeholder="Card name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box mt="md" ml="auto">
        <Button
          variant="outline"
          size="xs"
          mr="sm"
          leftSection={<IconX size={iconSizes.xs} />}
          onClick={onClickCancel}
        >
          Cancel
        </Button>
        <Button
          leftSection={<IconPlus size={12} />}
          loading={addPending}
          size="xs"
          onClick={onClickAdd}
        >
          Save
        </Button>
      </Box>
    </Card>
  );
};
