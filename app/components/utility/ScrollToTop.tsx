import { IconArrowUp } from "@tabler/icons-react";
import React from "react";

import Tooltip from "@/components/utility/Tooltip";

import styles from "@/styles/ScrollToTop.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function ScrollToTop() {
  const { colorTheme } = React.useContext(DarkModeContext);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [scroll, setScroll] = React.useState<number>(0);

  const buttonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(document.documentElement.scrollTop);
    });

    (buttonRef.current as HTMLDivElement).addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, []);

  React.useEffect(() => {
    if (scroll > 300) {
      setVisible(true);
    } else if (scroll <= 300) {
      setVisible(false);
    }
  }, [scroll]);

  return (
    <div className={`${styles.scrollToTop} ${styles[colorTheme]}`}>
      <Tooltip label="back to top" position="bottom">
        <div
          id="scroll-to-top"
          ref={buttonRef}
          className={styles.scrollButton}
          style={{
            visibility: visible ? "visible" : "hidden",
            opacity: visible ? 1 : 0,
          }}
        >
          <IconArrowUp size={40} />
        </div>
      </Tooltip>
    </div>
  );
}
