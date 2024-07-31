import { Outlet } from "@tanstack/react-router";
import { Paper, Title } from "@mantine/core";

import classes from "./auth-layout.module.css";

export const AuthLayout = () => {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <Outlet />
      </Paper>
    </div>
  );
};
