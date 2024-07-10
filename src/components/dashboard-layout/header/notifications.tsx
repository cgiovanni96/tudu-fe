import {
  ActionIcon,
  ActionIconProps,
  Avatar,
  Button,
  Drawer,
  ElementProps,
  Indicator,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Notification } from "./notification";
import { IconNotification } from "@tabler/icons-react";

type NotificationsProps = Omit<
  ActionIconProps,
  "children" | "c" | "onClick" | "size"
> &
  ElementProps<"button", keyof ActionIconProps>;

const notifications = [
  {
    id: "1",
    type: "network:request" as const,
    title: "Josh Dow sent you a friend request",
    receivedAt: new Date(),
    sentBy: {
      id: "123412",
      avatarUrl: "https://images.unsplash.com/photo-1556740737-768f5f9b94d6",
      displayName: "Josh Dow",
    },
  },
];

export function Notifications(props: NotificationsProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const hasNewNotifications = true;

  return (
    <>
      <Tooltip label="Notifications">
        <Indicator
          inline
          withBorder
          offset={6}
          size={12}
          processing={hasNewNotifications}
          disabled={!hasNewNotifications}
        >
          <ActionIcon
            variant="transparent"
            c="inherit"
            onClick={open}
            {...props}
          >
            <IconNotification />
          </ActionIcon>
        </Indicator>
      </Tooltip>

      <Drawer.Root
        position="right"
        opened={opened}
        onClose={close}
        size="380px"
      >
        <Drawer.Overlay />
        <Drawer.Content pos="relative">
          <Drawer.Header>
            <Drawer.Title mr="1rem">Notifications</Drawer.Title>
            <Button size="compact-sm" variant="subtle">
              View all
            </Button>
            <Drawer.CloseButton />
          </Drawer.Header>

          <Drawer.Body p="0">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                title={notification.title}
                receivedAt={notification.receivedAt}
                scope={notification.type.split(":").at(0)}
                icon={
                  <Avatar
                    src={notification.sentBy.avatarUrl}
                    alt={notification.sentBy.displayName}
                  />
                }
              />
            ))}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
