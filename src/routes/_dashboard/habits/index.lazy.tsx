import { createLazyFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/page";

const Habits = () => {
  return (
    <Page.Authenticated title="Habits">
      <Page.Header title="Habits" />
      Habits
    </Page.Authenticated>
  );
};

export const Route = createLazyFileRoute("/_dashboard/habits/")({
  component: Habits,
});
