import { ReactNode } from "react";
import {
  GroupProps,
  ElementProps,
  Title,
  Breadcrumbs,
  Anchor,
  Text,
  Group,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";

import type { BreadCrumb } from "@/types";

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
  return (
    <Group
      component="header"
      justify="space-between"
      align="start"
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

      <Group>{children}</Group>
    </Group>
  );
};
