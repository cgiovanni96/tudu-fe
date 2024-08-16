import { AUTH } from "@/client/api";
import { UnderlineHighlight } from "@/components/underline-highlight";
import {
  Anchor,
  Button,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link, createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

type Schema = z.infer<typeof registerSchema>;

const Register = () => {
  const form = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validate: zodResolver(registerSchema),
  });

  const router = useRouter();

  const registerMutation = AUTH.MUTATIONS.useRegisterMutation({});

  const registerOnClick = async (data: Schema) => {
    const response = await registerMutation.mutateAsync(data);

    if (response.success) {
      router.history.push("/auth/login");

      notifications.show({
        title: "Success",
        message: "You are logged in",
      });
    }
  };

  return (
    <Stack gap="xl">
      <Stack>
        <Title order={2}>
          Join us and never miss a thing{" "}
          <Text fz="inherit" fw="inherit" component="span" pos="relative">
            REGISTER
            <UnderlineHighlight
              c="blue"
              left="0"
              pos="absolute"
              h="0.625rem"
              bottom="-1rem"
              w="7rem"
            />
          </Text>
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
        >
          Register with Github
        </Button>
      </Group>

      <Divider label="OR" labelPosition="center" />

      <form onSubmit={form.onSubmit(registerOnClick)}>
        <TextInput
          label="Name"
          size="md"
          mt="md"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Email"
          size="md"
          mt="md"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          size="md"
          mt="md"
          label="Password"
          {...form.getInputProps("password")}
        />

        <Button
          loading={registerMutation.status === "pending"}
          type="submit"
          fullWidth
          mt="xl"
          size="md"
        >
          Register
        </Button>
      </form>

      <Text fz="sm" c="dimmed">
        Already have an account?{" "}
        <Anchor fz="inherit" component={Link} to={"/auth/login"}>
          Login
        </Anchor>
      </Text>
    </Stack>
  );
};

export const Route = createLazyFileRoute("/_auth/auth/register/")({
  component: Register,
});
