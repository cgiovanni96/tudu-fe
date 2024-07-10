import { Breadcrumbs } from "@mantine/core";
import { IconSeparator } from "@tabler/icons-react";

export default {
  Breadcrumbs: Breadcrumbs.extend({
    defaultProps: {
      separator: (
        <IconSeparator
          size="0.5rem"
          color="var(--mantine-color-dimmed)"
          opacity={0.4}
        />
      ),
    },
  }),
};
