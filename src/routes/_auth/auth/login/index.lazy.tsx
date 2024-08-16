import { useContext } from "react";
import { z } from "zod";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { IconBrandGithub } from "@tabler/icons-react";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Divider,
  Stack,
  Title,
  Group,
  Anchor,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { AuthContext } from "@/providers";
import { AUTH } from "@/client/api";
import { UnderlineHighlight } from "@/components/underline-highlight";

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
  const router = useRouter();

  const loginMutation = AUTH.MUTATIONS.useLoginMutation({
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

  const getSocialRedirect = (provider: string) => {
    return `${import.meta.env.VITE_API_URL}/api/v1/auth/${provider}/redirect`;
  };

  return (
    <Stack gap="xl">
      <Stack>
        <Title order={2}>
          Welcome back! Please{" "}
          <Text fz="inherit" fw="inherit" component="span" pos="relative">
            Sign in
            <UnderlineHighlight
              c="blue"
              left="0"
              pos="absolute"
              h="0.625rem"
              bottom="-1rem"
              w="7rem"
            />
          </Text>{" "}
          to continue.
        </Title>
        <Text fz="sm" c="dimmed">
          By signing up, you will gain access to exclusive content, special
          offers, and be the first to hear about exciting news and updates.
        </Text>
      </Stack>

      <Group grow>
        <Button
          leftSection={<IconBrandGithub size="1rem" />}
          variant="outline"
          color="gray"
          component="a"
          href={getSocialRedirect("github")}
        >
          Login with Github
        </Button>
      </Group>

      <Divider label="OR" labelPosition="center" />

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
      </form>

      <Text fz="sm" c="dimmed">
        Don&apos;t have an account?{" "}
        <Anchor fz="inherit" component={Link} to={"/auth/register"}>
          Register
        </Anchor>
      </Text>
    </Stack>
  );
};

const searchParamsSchema = z.object({
  redirect: z.optional(z.string()),
});

export const Route = createFileRoute("/_auth/auth/login/")({
  component: Login,
  validateSearch: (search) => searchParamsSchema.parse(search),
});
