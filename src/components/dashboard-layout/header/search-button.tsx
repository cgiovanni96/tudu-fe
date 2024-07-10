import { spotlight } from "@mantine/spotlight";
import {
  Button,
  TextInput,
  UnstyledButton,
  UnstyledButtonProps,
  ElementProps,
} from "@mantine/core";

import { SearchMenu } from "./search-menu";
import classes from "./search-button.module.css";
import { IconCommand, IconSearch } from "@tabler/icons-react";

type SearchButtonProps = Omit<UnstyledButtonProps, "children"> &
  ElementProps<"div", keyof UnstyledButtonProps>;

export function SearchButton(props: SearchButtonProps) {
  return (
    <>
      <UnstyledButton
        component="div"
        className={classes.input}
        onClick={spotlight.open}
        {...props}
      >
        <TextInput
          placeholder="Search feature"
          leftSection={<IconSearch />}
          rightSection={
            <Button
              component="span"
              size="compact-xs"
              leftSection={<IconCommand />}
            >
              K
            </Button>
          }
        />
      </UnstyledButton>

      <Button
        c="inherit"
        variant="transparent"
        className={classes.button}
        onClick={spotlight.open}
        leftSection={<IconSearch />}
        rightSection={
          <Button
            component="span"
            variant="filled"
            size="compact-md"
            leftSection={<IconCommand />}
          >
            K
          </Button>
        }
      />

      <SearchMenu />
    </>
  );
}
