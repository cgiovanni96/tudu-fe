import { Breadcrumbs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default {
  Breadcrumbs: Breadcrumbs.extend({
    defaultProps: {
      separator: <IconChevronRight color="var(--mantine-color-dimmed)" />,
    },
  }),
};
