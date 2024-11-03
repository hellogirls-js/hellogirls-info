import { useContext } from "react";
import TypeIt from "typeit-react";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { Link } from "@remix-run/react";

export default function Header({ heading }: { heading: string }) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <header className={`${styles.header} ${styles[colorTheme]}`}>
      <h1 className={styles.headerText}>
        <Link to="/" className={styles.headerLink}>
          <TypeIt
            options={{ speed: 100 }}
            getBeforeInit={(instance) => {
              instance
                .type(heading)
                .pause(5000)
                .delete(heading.length)
                .type("https://hellogirls.info");

              return instance;
            }}
          />
        </Link>
      </h1>
    </header>
  );
}
