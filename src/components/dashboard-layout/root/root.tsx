import { Paper, ScrollArea } from "@mantine/core";
import { Link, Outlet } from "@tanstack/react-router";

import { Logo } from "@/components/logo";
import { Sidebar } from "../sidebar";
import { Header } from "../header";
import classes from "./root.module.css";

export const DashboardLayout = () => {
  return (
    <div className={classes.root}>
      <Paper className={classes.sidebarWrapper} withBorder>
        <div className={classes.logoWrapper}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ScrollArea flex="1" px="md">
          <Sidebar />
        </ScrollArea>
      </Paper>
      <div className={classes.content}>
        <Header />
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
