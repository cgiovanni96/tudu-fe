import { Box, Loader } from "@mantine/core";
import classes from "./page.module.css";

export const PageLoading = () => {
  return (
    <Box component="section" className={classes.pageFullContainer}>
      <Loader type="dots" size="4rem" />
    </Box>
  );
};
