import { Dispatch, SetStateAction } from "react";

import styles from "@/styles/Ninjaman.module.scss";
import { ASOBI_SHINOBU } from "@/utilities/ninjaman";

export default function NinjamanHome({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<Page>>;
}) {
  return (
    <div className={`${styles.ninjamanHome} ${styles.ninjamanPage}`}>
      <div className={styles.ninjamanPageContainer}>
        <div className={styles.ninjamanShinobuContainer}>
          <img
            src={ASOBI_SHINOBU}
            alt="shnoob"
          />
        </div>
        <div className={styles.ninjamanPageContentContainer}>
          <div className={styles.ninjamanHeading}>
            <h3>Welcome to Ninjaman, de gozaru!</h3>
          </div>
          <div className={styles.ninjamanContent}>
            <div className={styles.ninjamanHomeButtons}>
              <button
                className={styles.ninjamanHomeButton}
                onClick={() => setCurrentPage("game")}
              >
                Start game
              </button>
              <button
                className={styles.ninjamanHomeButton}
                onClick={() => {
                  setCurrentPage("instructions");
                }}
              >
                Instructions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
