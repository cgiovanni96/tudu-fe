import { AuthLayout } from "@/components/auth-layout/auth-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => <AuthLayout />,
});
