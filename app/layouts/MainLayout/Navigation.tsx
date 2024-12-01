import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  IconCat,
  IconFolders,
  IconHeart,
  IconHome,
  IconNews,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import Tooltip from "@/components/utility/Tooltip";
import { Link } from "@remix-run/react";
import clsx from "clsx";

function NavigationButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      id="nav-button"
      className={clsx(styles.button, isOpen && styles.openButton)}
      onClick={() => {
        onClick((prev) => !prev);
      }}
    >
      <IconHeart size={40} />
    </button>
  );
}

function NavigationMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.navMenu}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <ul>
            <li>
              <Link to="/">
                <IconHome size={16} /> home
              </Link>
            </li>
            <li>
              <Link to="/projects">
                <IconFolders size={16} /> projects
              </Link>
            </li>
            <li>
              <Link to="/posts">
                <IconNews size={16} /> posts
              </Link>
            </li>
            <li>
              <Link to="/cat">
                <IconCat size={16} /> moo moo
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navigation() {
  const { colorTheme } = useContext(DarkModeContext);
  const [isOpen, openMenu] = useState<boolean>(false);

  return (
    <div className={`${styles.nav} ${styles[colorTheme]}`}>
      <Tooltip label="navigation" position="bottom">
        <NavigationButton isOpen={isOpen} onClick={openMenu} />
      </Tooltip>

      <NavigationMenu {...{ isOpen }} />
    </div>
  );
}
