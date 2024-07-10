import invariant from "tiny-invariant";

export function match<T>(...conditions: Array<[boolean, T]>) {
  const foundedCondition =
    conditions.find(([condition]) => condition) ?? conditions.at(-1);
  invariant(foundedCondition, "No conditions have been met");
  return foundedCondition[1];
}
