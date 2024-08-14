import { Button, Group } from "@mantine/core";

import { StickyHeader } from "@/components/sticky-header";
import { Logo } from "@/components/logo";
import { SidebarButton } from "./sidebar-button";
import { SearchButton } from "./search-button";
import { ColorSchemeToggler } from "./color-scheme-toggler";
import { CurrentUser } from "./current-user";
import { Notifications } from "./notifications";
import classes from "./header.module.css";
import { Link } from "@tanstack/react-router";
import { AUTH } from "@/client/api/auth";
import { IconUser } from "@tabler/icons-react";

export function Header() {
  const { data: user, error } = AUTH.QUERIES.useMe();

  return (
    <StickyHeader className={classes.root}>
      <div className={classes.rightContent}>
        <SidebarButton />
        <Link to="/" className={classes.logo}>
          <Logo />
        </Link>
        <SearchButton />
      </div>

      <Group>
        <ColorSchemeToggler />
        {user && !error ? (
          <>
            <Notifications />
            <CurrentUser />
          </>
        ) : (
          <Button
            component={Link}
            variant="light"
            leftSection={<IconUser />}
            to="/auth/login"
            size="sm"
          >
            Login
          </Button>
        )}
      </Group>
    </StickyHeader>
  );
}
