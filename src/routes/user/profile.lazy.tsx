import { AUTH } from "@/client/api/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Page = () => {
  const me = useQuery({ queryKey: ["me"], queryFn: AUTH.me });

  return (
    <div>
      {me.isLoading && <div>Loading...</div>}
      {me.data && <pre>{JSON.stringify(me.data, null, 2)}</pre>}
    </div>
  );
};

export const Route = createFileRoute("/user/profile")({
  component: Page,
});
