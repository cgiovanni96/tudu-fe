import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { IconCheck, IconHome2, IconSearch } from "@tabler/icons-react";
import { NavigateFn, useRouter } from "@tanstack/react-router";

const createActions = (navigate: NavigateFn): SpotlightActionData[] => [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => navigate({ to: "/" }),
    leftSection: <IconHome2 size="1.5rem" />,
  },
  {
    id: "tasks",
    label: "Tasks",
    description: "Manage all your tasks",
    onClick: () => navigate({ to: "/tasks" }),
    leftSection: <IconCheck size="1.5rem" />,
  },
];

export function SearchMenu() {
  const { navigate } = useRouter();

  return (
    <Spotlight
      actions={createActions(navigate)}
      nothingFound="Nothing found..."
      highlightQuery
      searchProps={{
        leftSection: <IconSearch />,
        placeholder: "Search feature",
      }}
    />
  );
}
