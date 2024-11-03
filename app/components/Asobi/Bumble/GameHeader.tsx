import styles from "@/styles/Bumble.module.scss";

function AsobiLogo() {
  return (
    <div className={styles.asobiLogo}>
      <span className={`${styles.logoLetter} ${styles.logoLetterA}`}>A</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterS}`}>S</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterO}`}>O</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterB}`}>B</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterI}`}>I</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterExclaim}`}>
        !
      </span>
    </div>
  );
}

export default function GameHeader() {
  return (
    <header>
      <div className={styles.logoContainer}>
        <AsobiLogo />
      </div>
    </header>
  );
}
