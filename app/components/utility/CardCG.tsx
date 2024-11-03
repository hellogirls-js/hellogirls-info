import { useContext } from "react";

import styles from "@/styles/CardCG.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";

export default function CardCG({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.imgContainer} ${styles[colorTheme]}`}>
      <img src={src} alt={alt} />
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
}
