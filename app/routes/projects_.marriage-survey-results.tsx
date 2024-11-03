import { useContext } from "react";

import styles from "@/styles/MarriageSurvey.module.scss";

import TotalResults from "@/components/MarriageSurvey/TotalResults";
import WordOccurences from "@/components/MarriageSurvey/WordOccurrences";
import RankingSummary from "@/components/MarriageSurvey/RankingSummary";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import MainLayout from "@/layouts/MainLayout";
import ScrollToTop from "@/components/utility/ScrollToTop";
import { getData } from "@/utilities";
import { json, Link, useLoaderData } from "@remix-run/react";

function Contents() {
  return (
    <div className={styles.contents}>
      <h4>contents</h4>
      <ul>
        <li>
          <Link to="#summary">ranking summary</Link>
        </li>
        <li>
          <Link to="#total">total results</Link>
        </li>
        <li>
          <Link to="#occurences">comparing words</Link>
          <ul>
            <li>
              <Link to="#md-occurences">most desirable</Link>
            </li>
            <li>
              <Link to="#ld-occurences">least desirable</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#cloud">word cloud</Link>
        </li>
        <li>
          <Link to="#conclusion">conclusion</Link>
        </li>
      </ul>
    </div>
  );
}

export default function MarriageSurveyResults() {
  const data = useLoaderData<typeof loader>();
  const enData = data.enData as any;
  const rawData = data.rawData as any;
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading="enstars marriage survey results">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div>
          <h2>marriage survey results: an analysis</h2>
          <p>
            hey! a couple weeks ago, i conducted a survey asking ensemble stars
            fans which characters they deemed to be the most and least desirable
            for marriage. the results are available{" "}
            <Link to="/post/most-desirable-survey-results" target="_blank">
              here (most desirable)
            </Link>{" "}
            and{" "}
            <Link to="/post/least-desirable-survey-results" target="_blank">
              here (least desirable)
            </Link>
            . i had lots of fun running the survey and i wanted to do an
            analysis of all the results and data, so here we are!
          </p>
          <p>
            character data, such as name, image color, and renders, is provided
            by{" "}
            <Link to="https://stars.ensemble.moe" target="_blank">
              makotools
            </Link>
            . thank you so much!
          </p>
          <p>(psst, i recommend viewing this site on desktop!)</p>
          <Contents />
          <RankingSummary {...{ rawData, enData }} />
          <TotalResults {...{ rawData, enData }} />
          <WordOccurences {...{ rawData, enData }} />
          <h2 id="conclusion">conclusion</h2>
          <p>
            thank you for taking the time to go thru this page! i hope you had
            as much fun analyzing things as i did. if you think i should keep
            doing things like this lemme know via{" "}
            <Link to="https://neospring.org/@hellogirls" target="_blank">
              neospring
            </Link>
            ! i also have a{" "}
            <Link to="https://www.buymeacoffee.com/hellogirls" target="_blank">
              buy me a coffee account
            </Link>{" "}
            if you appreciate my analyzing efforts (nothing expected tho, i just
            did this for fun haha).
          </p>
          <p>see you guys later!</p>
        </div>
        <ScrollToTop />
      </div>
    </MainLayout>
  );
}

export async function loader() {
  // taking makotools data like a boss
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);

  return json({ enData, rawData });
}
