import { Outlet } from "@tanstack/react-router";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

// import classes from "./auth-layout.module.css";
import { Logo } from "../logo";

export const AuthLayout = () => {
  return (
    <SimpleGrid mih="100vh" p="md" cols={{ base: 1, lg: 2 }}>
      <Flex direction="column" align="flex-start">
        <Center flex={1} w="100%">
          <Stack maw="25rem" gap="xl">
            <Logo />

            <Box>
              <Outlet />
            </Box>
          </Stack>
        </Center>
      </Flex>

      <Center
        ta="center"
        p="4rem"
        bg="var(--mantine-color-default-hover)"
        display={{ base: "none", lg: "flex" }}
        style={{ borderRadius: "var(--mantine-radius-md)" }}
      >
        <Box maw="40rem">
          <Title order={2}>The simplest way to manage your workspace.</Title>
          <Text my="lg" c="dimmed">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint velit officia consequat duis.
          </Text>

          <Image src={"/hero.png"} alt="Demo" />
        </Box>
      </Center>
    </SimpleGrid>
  );
};
