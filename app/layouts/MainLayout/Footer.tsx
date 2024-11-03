import React from "react";
import clsx from "clsx";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { Link } from "@remix-run/react";

export default function Footer() {
  const { colorTheme } = React.useContext(DarkModeContext);
  return (
    <footer className={clsx((styles as CSSModuleClasses).footer, (styles as CSSModuleClasses)[colorTheme])}>
      <p>created by son</p>
      <p>
        this website uses{" "}
        <Link to="https://remix.run/" rel="noreferrer" target="_blank">
          remix
        </Link>. icons are provided by{" "}
        <Link to="https://tabler.io/icons" rel="noreferrer" target="_blank">
          tabler icons
        </Link>
        .
      </p>
    </footer>
  );
}
