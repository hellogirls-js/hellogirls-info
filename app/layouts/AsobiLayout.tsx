import { ReactNode } from "react";

import styles from "@/styles/AsobiLayout.module.scss";
import { Link } from "@remix-run/react";

export function AsobiLogo() {
  return (
    <div className={styles.asobiLogo}>
      <span className={`${styles.logoLetter} ${styles.logoLetterA}`}>A</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterS}`}>S</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterO}`}>O</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterB}`}>B</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterI}`}>I</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterExclaim}`}>
        !
      </span>
    </div>
  );
}

function AsobiHeader({
  title,
  darkMode,
}: {
  title?: string;
  darkMode?: boolean;
}) {
  return (
    <header className={styles.asobiHeader}>
      <AsobiLogo />
      {!darkMode && (
        <div className={styles.asobiTitle}>
          <h2>{title}!</h2>
        </div>
      )}
    </header>
  );
}

function AsobiFooter() {
  return (
    <footer className={styles.asobiFooter}>
      <div className={styles.asobiCharas}>
        {[7, 8, 37, 42, 71].map((id) => (
          <img
            src={`https://assets.enstars.link/assets/character_sd_square1_${id}.png`}
            alt={`${id}`}
            key={id}
            width={75}
            height={75}
          />
        ))}
      </div>
      <p>
        Made by{" "}
        <Link to="https://twitter.com/hellogirls_DEV" rel="noreferrer" target="_blank">
          Son
        </Link>
        . If you like what I&apos;m doing, you can{" "}
        <Link to="https://buymeacoffee.com/hellogirls" rel="noreferrer" target="_blank">
          buy me a coffee
        </Link>
        !
      </p>
    </footer>
  );
}

export default function AsobiLayout({
  children,
  darkMode = false,
  title,
}: {
  children: ReactNode;
  darkMode?: boolean;
  title?: string;
}) {
  return (
    <div
      id="asobi-layout"
      className={`${styles.asobi}${darkMode ? ` ${styles.dark}` : ""}`}
    >
      <AsobiHeader {...{ darkMode, title }} />
      <div className={styles.asobiContainer}>{children}</div>
      <AsobiFooter />
    </div>
  );
}
