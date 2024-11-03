import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";

import styles from "@/styles/Accordion.module.scss";

export default function Accordion({
  title,
  icon = <IconChevronDown size={30} />,
  children,
  style,
}: {
  title?: string | React.ReactNode;
  icon?: any;
  children: JSX.Element | string;
  style?: React.CSSProperties;
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openDrawer = {
    hidden: {
      height: 0,
      display: "none",
    },
    visible: {
      height: "auto",
      display: "block",
    },
  };

  return (
    <div className={styles.accordion} style={style}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <motion.div
          className={styles.accordionIcon}
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {icon}
        </motion.div>
      </button>
      <motion.div
        layout
        className={styles.accordionContent}
        variants={openDrawer}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}
