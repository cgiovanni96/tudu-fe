import { PropsWithChildren, ReactNode } from "react";
import {
  GroupProps,
  ElementProps,
  Title,
  Breadcrumbs,
  Anchor,
  Text,
  Group,
  ActionIcon,
  Drawer,
  Stack,
} from "@mantine/core";

import { Link } from "@tanstack/react-router";
import type { BreadCrumb } from "@/types";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";

interface Props
  extends Omit<GroupProps, "title">,
    ElementProps<"header", keyof GroupProps> {
  icon?: ReactNode;
  title: ReactNode;
  breadcrumbs?: Array<BreadCrumb>;
}

export const PageHeader = ({
  children,
  icon,
  title,
  breadcrumbs,
  className,
  ...props
}: Props) => {
  const matches = useMediaQuery("(min-width: 56.25em)");

  return (
    <Group
      component="header"
      justify="space-between"
      className={className}
      {...props}
    >
      <div>
        <Title component="h2" order={2}>
          <Group gap="sm">
            {icon && icon}
            {title}
          </Group>
        </Title>

        {breadcrumbs && (
          <Breadcrumbs mt="sm">
            {breadcrumbs.map((breadcrumb) =>
              breadcrumb.href ? (
                <Anchor
                  fz="sm"
                  underline="never"
                  c="inherit"
                  component={Link}
                  key={breadcrumb.label}
                  to={breadcrumb.href}
                >
                  {breadcrumb.label}
                </Anchor>
              ) : (
                <Text key={breadcrumb.label} c="dimmed" fz="sm">
                  {breadcrumb.label}
                </Text>
              ),
            )}
          </Breadcrumbs>
        )}
      </div>

      {matches ? (
        <Group>{children}</Group>
      ) : (
        <PageHeaderMobileDrawer>{children}</PageHeaderMobileDrawer>
      )}
    </Group>
  );
};

const PageHeaderMobileDrawer = ({ children }: PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon onClick={open}>
        <IconMenu2 />
      </ActionIcon>

      <Drawer opened={opened} onClose={close} title="Options">
        <Stack>{children}</Stack>
      </Drawer>
    </>
  );
};
