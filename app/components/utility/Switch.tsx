import React from "react";

import styles from "@/styles/Switch.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function Switch({
  leftLabel,
  rightLabel,
  checked,
  onClick,
}: {
  leftLabel?: string;
  rightLabel?: string;
  checked: boolean;
  onClick?: (checked: boolean) => void;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);
  return (
    <div
      className={`${styles.switchContainer} ${styles[colorTheme]}`}
      onClick={() => onClick!(!checked)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter") onClick!(!checked)
      }}
      tabIndex={0}
      aria-checked={checked}
      role="switch"
    >
      {leftLabel && <span className={styles.label}>{leftLabel}</span>}
      <div className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={(e) => {}} />
        <span className={styles.slider}>
          <span
            className={styles.sliderButton}
            style={{ transform: `translateX(${checked ? 26 : 0}px)` }}
          />
        </span>
      </div>
      {rightLabel && <span className={styles.label}>{rightLabel}</span>}
    </div>
  );
}
