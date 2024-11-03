import React from "react"

import styles from "@/styles/Fieldset.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function Fieldset({
  legend,
  children,
}: {
  legend?: string;
  children: JSX.Element | string;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);
  return (
    <fieldset className={`${styles.fieldset} ${styles[colorTheme]}`}>
      <legend className={styles.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
}
