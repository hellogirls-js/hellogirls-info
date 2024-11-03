import React from "react";

import Footer from "./Footer";

import styles from "@/styles/MainLayout.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import Menu from "./Menu";
import Header from "./Header";
import Navigation from "./Navigation";

export default function MainLayout({
  children,
  heading,
}: {
  children?: JSX.Element | string;
  heading: string;
}) {
  const { colorTheme } = React.useContext(DarkModeContext);

  React.useEffect(() => {
    document.body.className = styles[colorTheme];
  }, [colorTheme]);

  return (
    <div id="main-layout" className={`${styles.main} ${styles[colorTheme]}`}>
      <Menu />
      <Header heading={heading} />
      <main className={styles.component}>{children}</main>
      <Navigation />
      <Footer />
    </div>
  );
}
