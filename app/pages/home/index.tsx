import React from "react";
import styles from "./styles.module.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import About from "./components/About";

const FLOWER_COLORS = [
  {
    petals: "#ffe252",
    middle: "#ffa552",
  },
  {
    petals: "#fffdf7",
    middle: "#ffc21c",
  },
  {
    petals: "#d3e381",
    middle: "#ffb0d2",
  },
  {
    petals: "#98a9f5",
    middle: "#f5d176",
  },
  {
    petals: "#be89d9",
    middle: "#e1eb88",
  },
];

export default function Index() {
  const birthday = React.useRef(
    (import.meta.env as ImportMetaEnv).BIRTHDAY ?? "",
  );

  React.useEffect(() => {
    if (import.meta.env.BIRTHDAY?.length)
      birthday.current = import.meta.env.BIRTHDAY;
  }, [import.meta.env]);

  return (
    <>
      <title>hellogirls.info!</title>
      <main className={styles.main}>
        <div className={styles.fallingFlowers}></div>
        <Menu />
        <Header />
        <About />
      </main>
    </>
  );
}
