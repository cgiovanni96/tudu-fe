export function groupBy<T, K extends keyof Record<string, unknown>>(
  list: T[],
  getKey: (item: T) => K,
): Record<string, T[]> {
  const obj: Record<string, T[]> = {};
  list.forEach((item) => {
    const key = String(getKey(item));
    if (!obj[key]) {
      obj[key] = [item];
    } else {
      obj[key].push(item);
    }
  });
  return obj;
}
