import { Box, Title } from "@mantine/core";
import classes from "./page.module.css";
import { IconBarrierBlock } from "@tabler/icons-react";

type Props = {
  message?: string;
};

export const PageError = ({ message }: Props) => {
  return (
    <Box className={classes.pageFullContainer}>
      <IconBarrierBlock size="8rem" stroke={1.5} />
      <Title component="h1">{message || "Something went wrong"}</Title>
    </Box>
  );
};
