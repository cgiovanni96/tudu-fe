import { Page as PageRoot } from "./page";
import { PageHeader } from "./page-header";
import { PageError } from "./page-error";
import { PageLoading } from "./page-loading";
import { AuthenticatedPage } from "./authenticated-page";

export const Page = {
  Root: PageRoot,
  Header: PageHeader,
  Error: PageError,
  Loading: PageLoading,
  Authenticated: AuthenticatedPage,
};
