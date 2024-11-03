import React from "react";

import styles from "@/styles/Alert.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import clsx from "clsx";

type AlertType = "default" | "warning" | "error";

export default function Alert({
  icon,
  style,
  children,
  type = "default",
}: {
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  children: JSX.Element | string;
  type?: AlertType;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);
  return (
    <div
      className={clsx(styles.alert, styles[colorTheme], styles[type])}
      style={style}
    >
      {icon}
      {children}
    </div>
  );
}
