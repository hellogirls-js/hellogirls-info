import { useEffect, useState } from "react";

import styles from "@/styles/MadLibs.module.scss";

import MadLibsHome from "@/components/Asobi/MadLibs/MadLibsHome";
import MadLibsInstructions from "@/components/Asobi/MadLibs/MadLibsInstructions";
import MadLibsGame from "@/components/Asobi/MadLibs/MadLibsGame";
import MadLibsResult from "@/components/Asobi/MadLibs/MadLibsResult";

import AsobiLayout from "@/layouts/AsobiLayout";

  const AsobiSora1 = (
    <img
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_1.png"
      width={329}
      height={564}
      alt="sora"
    />
  );
  const AsobiSora2 = (
    <img
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_2.png"
      width={329}
      height={564}
      alt="sora"
    />
  );
  const AsobiSora3 = (
    <img
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_3.png"
      width={329}
      height={564}
      alt="sora"
    />
  );

function MadLibsLoading() {
  return (
    <div className={styles.madlibsContentBlock}>
      <div className={styles.madlibsMainContent}>
        <h3>Loading...</h3>
      </div>
    </div>
  );
}

export default function MadLibs() {
  const [soraImg, setSoraImg] = useState(AsobiSora1);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [story, setStory] = useState<string | null>(null);
  const [storyError, setStoryError] = useState<boolean>(false);
  const [result, setResult] = useState<Record<string, string | null> | null>(null);

  useEffect(() => {
    if (currentPage === "instructions") setSoraImg(AsobiSora2);
    if (currentPage === "home" || currentPage === "game")
      setSoraImg(AsobiSora1);
    if (currentPage === "result") setSoraImg(AsobiSora3);
  }, [currentPage]);

  useEffect(() => {
    if (result) {
      setCurrentPage("result");
    }
  }, [result]);

  return (
    <AsobiLayout title="Mad Libs">
      <div className={styles.madlibsContainer}>
        {currentPage === "home" && (
          <MadLibsHome
            {...{setCurrentPage, setStory, setStoryError}}
          />
        )}
        {currentPage === "instructions" && (
          <MadLibsInstructions {...{setCurrentPage}} />
        )}
        {currentPage === "loading" && <MadLibsLoading />}
        {currentPage === "game" && story && !storyError && (
          <MadLibsGame {...{story, setResult}} />
        )}
        {currentPage === "result" && result && story && (
          <MadLibsResult
            {...{
              result,
              setResult,
              story,
              setStory,
              setCurrentPage,
              setStoryError
            }}
          />
        )}
        <div
          className={styles.madlibsSora}
          style={{
            marginBottom:
              currentPage === "result" || currentPage === "instructions"
                ? "1vh"
                : "20vh",
          }}
        >
          {soraImg}
        </div>
      </div>
    </AsobiLayout>
  );
}

