import { Link, LinkOptions, RegisteredRouter } from "@tanstack/react-router";
import styles from "./route-link.module.css";
import { PropsWithChildren } from "react";

type Props<TTo extends string> = {
  className?: string;
} & LinkOptions<RegisteredRouter, "/", TTo> &
  PropsWithChildren;

export const RouteLink = <TTo extends string>(props: Props<TTo>) => {
  return (
    <Link {...(props as any)} className={props.className || styles.link}>
      {props.children}
    </Link>
  );
};
