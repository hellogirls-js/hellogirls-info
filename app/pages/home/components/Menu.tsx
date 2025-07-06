import React from "react";
import styles from "../styles.module.scss";
import {
  IconBrandGithubFilled,
  IconBrandTwitterFilled,
  IconCoffee,
} from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useViewportSize } from "@mantine/hooks";

export default function Menu() {
  const { height: viewportHeight } = useViewportSize();
  const { scrollYProgress, scrollY } = useScroll();

  const progressBarWidth = useTransform(
    () => `${scrollYProgress.get() * 100}%`,
  );

  const navColor = useTransform(() => {
    if (scrollY.get() >= 0 && scrollY.get() <= viewportHeight / 2) {
      return "#fff";
    } else {
      return "#cc7e64";
    }
  });

  return (
    <nav className={styles.navContainer}>
      <div className={styles.progressBarContainer}>
        <motion.div
          className={styles.progressBar}
          style={{ width: progressBarWidth, backgroundColor: navColor }}
        />
      </div>
      <div className={styles.navIcons}>
        <motion.a
          href="https://twitter.com/hellogirls_DEV"
          style={{ color: navColor }}
        >
          <IconBrandTwitterFilled />
        </motion.a>
        <motion.a
          href="https://github.com/hellogirls-js"
          style={{ color: navColor }}
        >
          <IconBrandGithubFilled />
        </motion.a>
        <motion.a
          href="https://www.buymeacoffee.com/hellogirls"
          style={{ color: navColor }}
        >
          <IconCoffee />
        </motion.a>
      </div>
    </nav>
  );
}
