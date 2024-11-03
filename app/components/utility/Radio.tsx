import React from "react";

import styles from "@/styles/Radio.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import clsx from "clsx";

export default function Radio({
  id,
  name,
  value,
  label,
}: {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);

  return (
    <div className={clsx(styles.radio, styles[colorTheme])}>
      <input type="radio" value={value} id={id} name={name} />
      {label && <label htmlFor={value}>{label}</label>}
    </div>
  );
}
