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
  title: ReactNode;
  breadcrumbs?: Array<BreadCrumb>;
}

export const PageHeader = ({
  children,
  title,
  breadcrumbs,
  className,
  mb = "xl",
  ...props
}: Props) => {
  return (
    <Group
      component="header"
      justify="space-between"
      className={className}
      mb={mb}
      {...props}
    >
      <div>
        <Title component="h2" order={2}>
          {title}
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

      {children}
    </Group>
  );
};
