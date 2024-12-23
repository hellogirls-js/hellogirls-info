import { IconReload } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

import styles from "@/styles/MadLibs.module.scss";

import { createStory, generateStory } from "@/utilities/madlibs";

export default function MadLibsResult({
  result,
  story,
  setStory,
  setResult,
  setCurrentPage,
  setStoryError,
}: {
  result: Record<string, string | null>;
  story: string;
  setStory: Dispatch<SetStateAction<string | null>>;
  setResult: Dispatch<SetStateAction<Record<string, string | null> | null>>;
  setCurrentPage: Dispatch<SetStateAction<Page>>;
  setStoryError: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.madlibsContentBlock}>
      <div className={styles.madlibsHeading}>
        <h3>Here&apos;s the story!</h3>
      </div>
      <div className={styles.madlibsMainContent}>
        {createStory(result, story)}
        <div className={styles.madlibsPartialButtonContainer}>
          <button
            className={`${styles.madlibsPartialButton} ${styles.madlibsRightButton}`}
            onClick={() => {
              setStory(null);
              setResult(null);
              generateStory(setCurrentPage, setStory, setStoryError);
            }}
            style={{ width: "35%" }}
          >
            <IconReload /> New game!
          </button>
        </div>
      </div>
    </div>
  );
}
