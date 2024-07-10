import dayjs from "dayjs";

export type MapKeys = "1_DAY_BEFORE" | "1_HOUR_BEFORE";
export type MapValues = { amount: number; unit: dayjs.ManipulateType };

export const remainderMap: Record<MapKeys, MapValues> = {
  "1_DAY_BEFORE": {
    amount: 1,
    unit: "day",
  },
  "1_HOUR_BEFORE": {
    amount: 1,
    unit: "hour",
  },
};

export const remainderOptions: Array<{ value: MapKeys; label: string }> = [
  { value: "1_DAY_BEFORE", label: "1 day before" },
  { value: "1_HOUR_BEFORE", label: "1 hour before" },
];
