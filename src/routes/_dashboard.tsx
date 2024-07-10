import { DashboardLayout } from "@/components/dashboard-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: () => {
    return <DashboardLayout />;
  },
});
