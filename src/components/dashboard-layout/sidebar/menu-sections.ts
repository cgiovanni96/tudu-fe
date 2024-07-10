import {
  IconCalendar,
  IconCheck,
  IconHome2,
  IconLogin,
  IconRepeat,
  IconSignature,
} from "@tabler/icons-react";
import { ElementType } from "react";

interface MenuItem {
  header: string;
  section: {
    name: string;
    href: string;
    icon: ElementType;
    dropdownItems?: {
      name: string;
      href: string;
      badge?: string;
    }[];
  }[];
}

export const menu: MenuItem[] = [
  {
    header: "Home",
    section: [{ name: "Dashboard", href: "/", icon: IconHome2 }],
  },
  {
    header: "Apps",
    section: [
      {
        name: "Tasks",
        href: "/tasks",
        icon: IconCheck,
      },
      {
        name: "Habits",
        href: "/habits",
        icon: IconRepeat,
      },
      {
        name: "Calendar",
        href: "/calendar",
        icon: IconCalendar,
      },
    ],
  },

  {
    header: "Auth",
    section: [
      {
        name: "Login",
        href: "/auth/login",
        icon: IconLogin,
      },
      {
        name: "Register",
        href: "/auth/register",
        icon: IconSignature,
      },
    ],
  },
];
