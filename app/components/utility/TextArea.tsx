import React from "react";

import styles from "@/styles/TextArea.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function Textarea({
  label,
  refProp,
  placeholder,
  value,
  name,
  id,
  style,
  textareaStyle,
  required,
  rows = 8,
  maxLength,
}: {
  label?: string;
  refProp?: React.MutableRefObject<HTMLTextAreaElement | null>;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
  textareaStyle?: React.CSSProperties;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);

  return (
    <div
      className={[styles.textareaContainer, styles[colorTheme]].join(" ")}
      style={style}
    >
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={refProp}
        placeholder={placeholder}
        name={name}
        value={value}
        aria-label={label || name || "textarea"}
        style={textareaStyle}
        required={required}
        rows={rows}
        maxLength={maxLength}
      />
    </div>
  );
}
