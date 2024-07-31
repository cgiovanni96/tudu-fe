import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { IconBrandGithub } from "@tabler/icons-react";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Divider,
  Box,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useContext } from "react";

import { AuthContext } from "@/providers";
import { AUTH } from "@/client/api";

const loginSchema = z.object({
  email: z.string().min(1).max(255).email(),
  password: z.string().min(1).max(255),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const auth = useContext(AuthContext);
  const form = useForm<LoginSchema>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const search = Route.useSearch();

  const client = useQueryClient();
  const router = useRouter();

  const loginMutation = AUTH.MUTATIONS.useLoginMutation({
    client,
    onSuccess: async () => {
      await auth?.authenticate(form.getValues().email);
    },
  });

  const authOnClick = async (data: LoginSchema) => {
    const response = await loginMutation.mutateAsync(data);
    if (response.success) {
      notifications.show({
        title: "Success",
        message: "You are logged in",
      });

      if (!search.redirect) {
        router.history.push("/");
      } else {
        router.history.push(`/${search.redirect}`);
      }
    }
  };

  return (
    <>
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
          loading={loginMutation.isPending}
          type="submit"
          fullWidth
          mt="xl"
          size="md"
        >
          Login
        </Button>

        <Divider my="md" />

        <Button
          leftSection={<IconBrandGithub />}
          variant="light"
          mt="sm"
          fullWidth
          size="md"
          component="a"
          href="http://localhost:8888/api/v1/auth/github/redirect"
        >
          Github
        </Button>
      </form>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Box component={Link} to="/auth/register">
          Register
        </Box>
      </Text>
    </>
  );
};

const searchParamsSchema = z.object({
  redirect: z.optional(z.string()),
});

export const Route = createFileRoute("/_auth/auth/login/")({
  component: Login,
  validateSearch: (search) => searchParamsSchema.parse(search),
});
