import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { HamburgerButton } from "@/components/hamburger-button";
import { Logo } from "@/components/logo";
import { Sidebar } from "../sidebar";

// TODO: close on route change
export function SidebarButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} size="270px">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header px="1.725rem" mb="md">
            <Logo />
          </Drawer.Header>
          <Drawer.Body>
            <Sidebar />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <HamburgerButton onClick={open} display={{ xl: "none" }} />
    </>
  );
}
