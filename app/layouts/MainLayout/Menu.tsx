import {
  IconBrandGithub,
  IconBrandTwitter,
  IconCoffee,
  IconMessageCircle,
  IconMoonStars,
  IconSunFilled,
} from "@tabler/icons-react";
import { useContext } from "react";
import { useMediaQuery } from "@mantine/hooks";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import ScrollIndicator from "@/components/utility/ScrollIndicator";
import { Link } from "@remix-run/react";

export default function Menu() {
  const { colorTheme, toggleColorTheme } = useContext(DarkModeContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const ICON_SIZE = isMobile ? 20 : 24;
  const buttonIcon =
    colorTheme === "dark" ? (
      <IconMoonStars size={ICON_SIZE} />
    ) : (
      <IconSunFilled size={ICON_SIZE} />
    );

  return (
    <div className={`${styles.menu} ${styles[colorTheme]}`}>
      <ScrollIndicator />
      <div className={styles.right}>
        <div className={styles.socials}>
          <Link to="https://twitter.com/hellogirls_dev" rel="noreferrer" target="_blank">
            <IconBrandTwitter size={ICON_SIZE} />
          </Link>
          <Link to="https://github.com/hellogirls-js" rel="noreferrer" target="_blank">
            <IconBrandGithub size={ICON_SIZE} />
          </Link>
          <Link to="https://neospring.org/@hellogirls" rel="noreferrer" target="_blank">
            <IconMessageCircle size={ICON_SIZE} />
          </Link>
          <Link to="https://www.buymeacoffee.com/hellogirls" rel="noreferrer" target="_blank">
            <IconCoffee size={ICON_SIZE} />
          </Link>
        </div>
        <button
          id="theme-toggle"
          className={styles.toggleButton}
          onClick={() => {
            toggleColorTheme();
          }}
        >
          {buttonIcon} <span id={styles.buttonText}>{colorTheme}</span>
        </button>
      </div>
    </div>
  );
}
