import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { IconBrandGithub } from "@tabler/icons-react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AUTH } from "@/client/api/auth";

import classes from "./login.module.css";
import { notifications } from "@mantine/notifications";

const loginSchema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(1).max(255),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginSchema>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const client = useQueryClient();
  const router = useRouter();

  const mutation = AUTH.useLoginMutation(client);

  const authOnClick = async (data: LoginSchema) => {
    const response = await mutation.mutateAsync(data);
    console.log("response", response);
    if (response.success) {
      // FIX: notifications.show does not work
      notifications.show({
        title: "Success",
        message: "You are logged in",
      });
      router.history.push("/");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>

        <form onSubmit={form.onSubmit((data) => authOnClick(data))}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />

          <Button
            loading={mutation.isPending}
            type="submit"
            fullWidth
            mt="xl"
            size="md"
          >
            Login
          </Button>

          <Button
            leftSection={<IconBrandGithub />}
            variant="subtle"
            fullWidth
            mt="xl"
            size="md"
            component="a"
            href="http://localhost:8888/api/v1/auth/github/redirect"
          >
            Github
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export const Route = createLazyFileRoute("/auth/login/")({
  component: Login,
});
