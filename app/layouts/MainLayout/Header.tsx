import { useContext } from "react";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { Link } from "@remix-run/react";

export default function Header({ heading }: { heading: string }) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <header className={`${styles.header} ${styles[colorTheme]}`}>
      <h1 className={styles.headerText}>
        <Link to="/" className={styles.headerLink}>
          https://hellogirls.info
        </Link>
      </h1>
    </header>
  );
}
