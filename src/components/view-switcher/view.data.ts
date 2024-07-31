import { View } from "@/types/shared";
import {
  Icon,
  IconList,
  IconListDetails,
  IconProps,
  IconTable,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ViewType = {
  value: View;
  label: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

export const viewTypes: Array<ViewType> = [
  {
    value: "default",
    label: "Default",
    Icon: IconListDetails,
  },
  {
    value: "list",
    label: "List",
    Icon: IconList,
  },
  {
    value: "table",
    label: "Table",
    Icon: IconTable,
  },
];

export const getViewIcon = (
  view: View,
): ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> => {
  return viewTypes.find((viewType) => viewType.value === view)!.Icon;
};
