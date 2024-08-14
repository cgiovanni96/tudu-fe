import { forwardRef, ReactNode } from "react";
import { BoxProps } from "@mantine/core";
import { AUTH } from "@/client/api";
import { PageLoading } from "./page-loading";
import { Navigate, useRouterState } from "@tanstack/react-router";
import { Page } from "./page";

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}
export const AuthenticatedPage = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    const { status } = AUTH.QUERIES.useMe();
    const { location } = useRouterState();

    const redirect = location.pathname.slice(1, location.pathname.length);

    return (
      <>
        {status === "pending" && <PageLoading />}
        {status === "error" && (
          <Navigate to={`/auth/login?redirect=${redirect}`} />
        )}

        {status === "success" && (
          <Page ref={ref} {...props}>
            {children}
          </Page>
        )}
      </>
    );
  },
);
