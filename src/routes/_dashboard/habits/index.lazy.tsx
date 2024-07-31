import { AuthenticatedPage, PageHeader } from "@/components/page";
import { createLazyFileRoute } from "@tanstack/react-router";

const Habits = () => {
  return (
    <AuthenticatedPage title="Habits">
      <PageHeader title="Habits" />
      Habits
    </AuthenticatedPage>
  );
};

export const Route = createLazyFileRoute("/_dashboard/habits/")({
  component: Habits,
});
