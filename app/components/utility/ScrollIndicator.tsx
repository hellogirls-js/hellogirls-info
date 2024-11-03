import React from "react";

import styles from "@/styles/ScrollIndicator.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function ScrollIndicator() {
  const { colorTheme } = React.useContext(DarkModeContext);

  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const scrollEventListener = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    }
    window.addEventListener("scroll", scrollEventListener);

    return () => window.removeEventListener("scroll", scrollEventListener);
  }, []);

  return (
    <div className={styles[colorTheme]}>
      <div className={styles.indicator}>
        <div
          className={styles.bar}
          id="bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
