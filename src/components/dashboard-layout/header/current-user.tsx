import { Avatar, AvatarProps, ElementProps, Loader, Menu } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { AUTH } from "@/client/api/auth";
import { iconSizes } from "@/data";

type CurrentUserProps = Omit<AvatarProps, "src" | "alt"> &
  ElementProps<"div", keyof AvatarProps>;

const userInitials = (name: string): string => {
  if (name.length === 1) return name.toUpperCase();

  const splitted = name.split(" ");

  return splitted.length === 1
    ? `${splitted[0][0].toUpperCase()}${splitted[0][1].toUpperCase()}`
    : `${splitted[0][0].toUpperCase()}${splitted[splitted.length - 1][0].toUpperCase()}`;
};

export function CurrentUser(props: CurrentUserProps) {
  const { data: user } = AUTH.QUERIES.useMe();
  const logout = AUTH.MUTATIONS.useLogoutMutation();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          alt={user?.name ?? "Current user"}
          {...props}
          color="teal"
          style={{ cursor: "pointer", ...props.style }}
        >
          {userInitials(user?.name || "Current user")}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={<IconUser size={iconSizes.sm} />}
          component={Link}
          to="/user/profile"
        >
          Profile
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          leftSection={
            logout.isPending ? (
              <Loader size={"sm"} />
            ) : (
              <IconLogout size={iconSizes.sm} />
            )
          }
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
