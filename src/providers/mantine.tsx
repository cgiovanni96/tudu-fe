import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/code-highlight/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "@mantine/spotlight/styles.layer.css";
import "@mantine/carousel/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/nprogress/styles.layer.css";
import "@mantine/tiptap/styles.layer.css";
import "@mantine/charts/styles.layer.css";

import "@blocknote/mantine/style.css";

import "../globals.css";
import { HelmetProvider } from "react-helmet-async";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import { PropsWithChildren } from "react";
import { theme } from "@/theme";

export const Mantine = ({ children }: PropsWithChildren) => {
  return (
    <HelmetProvider>
      <MantineProvider theme={theme}>
        <Notifications position="bottom-right" />
        <NavigationProgress />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </HelmetProvider>
  );
};
