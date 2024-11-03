import React from "react";

import styles from "@/styles/Tooltip.module.scss";

export default function Tooltip({
  label,
  style,
  position,
  children,
}: {
  label: string;
  style?: React.CSSProperties;
  position: "top" | "bottom";
  children: JSX.Element | string;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={`${styles.tooltip} ${styles[position]}`} style={style}>
        {label}
      </div>
    </div>
  );
}
