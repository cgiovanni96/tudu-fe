import { AUTH } from "@/client/api";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
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
    <>
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
    </>
  );
};

export const Route = createLazyFileRoute("/_auth/auth/register/")({
  component: Register,
});
