import { QueryClient } from "@tanstack/react-query";

export type BreadCrumb = {
  label: string;
  href?: string;
};

export type MutationParams = {
  client: QueryClient;
};
