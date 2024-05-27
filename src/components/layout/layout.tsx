import cx from "clsx";
import {
  AppShell,
  Avatar,
  Button,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { RouteLink } from "@/components/route-link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import { AUTH } from "@/client/api/auth";
import { Logo } from "@/components/logo";
import { IconChevronDown, IconHeart, IconLogout } from "@tabler/icons-react";
import { useState } from "react";

import classes from "./layout.module.css";

export const Layout = () => {
  const pinned = useHeadroom({ fixedAt: 120 });
  const client = useQueryClient();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { data, error } = useQuery({
    queryKey: ["me"],
    queryFn: AUTH.me,
    retry: false,
  });

  const logout = AUTH.useLogoutMutation(client);

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Link to="/">
            <Logo />
          </Link>
          <Group flex={1} justify="center">
            <RouteLink to="/">Home</RouteLink>
            <RouteLink to="/about">About</RouteLink>
          </Group>
          <Group>
            {logout.isPending && <span>Logging out...</span>}

            {!data || error ? (
              <Button
                renderRoot={(props) => (
                  <Link to="/auth/login" {...props}>
                    Login
                  </Link>
                )}
              />
            ) : (
              <Group>
                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group gap={7}>
                        <Avatar
                          alt={"user"}
                          color="teal"
                          radius="xl"
                          size="sm"
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                          {data.name}
                        </Text>
                        <IconChevronDown
                          style={{ width: rem(12), height: rem(12) }}
                          stroke={1.5}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconHeart
                          style={{ width: rem(16), height: rem(16) }}
                          color={theme.colors.red[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconLogout
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                      onClick={() => logout.mutate()}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
