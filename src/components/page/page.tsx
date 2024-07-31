import { Navigate, useRouterState } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { forwardRef, ReactNode, useEffect } from "react";
import { BoxProps, Stack } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";

import { AUTH } from "@/client/api";
import { PageLoading } from "./page-loading";

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}
export const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "Home", meta, ...other }, ref) => {
    const { status } = AUTH.useMe();
    const { location } = useRouterState();

    useEffect(() => {
      nprogress.complete();
      return nprogress.start;
    }, [location.pathname]);

    return (
      <>
        <Helmet>
          <title>{`${title} | Tudu `}</title>
          {meta}
        </Helmet>

        {status === "pending" && <PageLoading />}
        {status === "error" && <Navigate to="/auth/login" />}

        {status === "success" && (
          <Stack ref={ref} {...other} h="100%">
            {children}
          </Stack>
        )}
      </>
    );
  },
);
