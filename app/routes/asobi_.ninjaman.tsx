import { Suspense, useState } from "react";

import styles from "../styles/Ninjaman.module.scss";

import NinjamanHome from "@/components/Asobi/Ninjaman/NinjamanHome";
import NinjamanInstructions from "@/components/Asobi/Ninjaman/NinjamanInstructions";
import NinjamanGame from "@/components/Asobi/Ninjaman/NinjamanGame";

import AsobiLayout from "@/layouts/AsobiLayout";
import { getRandomIndexFromArray } from "@/utilities";
import { json } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import NinjamanGameLoading from "@/components/Asobi/Ninjaman/NinjamanLoading";

export async function loader() {
  const phraseOptions = ["name", "song"];
  const randomPhraseOptionIndex = getRandomIndexFromArray(phraseOptions);
  const randomPhraseOption = phraseOptions[randomPhraseOptionIndex];
  const promptData = await fetch(`https://assets.hellogirls.info/asobi/ninjaman/${randomPhraseOption}s.txt`);
  const promptOptionsGroup = await promptData.text();
  const promptOptions = promptOptionsGroup.split("\n");
  const randomPromptOptionIndex = getRandomIndexFromArray(promptOptions);
  const randomPrompt = promptOptions[randomPromptOptionIndex];

  return json({type: randomPhraseOption, phrase: randomPrompt});
}

export default function Ninjaman() {
  const data = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <AsobiLayout title="Ninjaman">
      <div className={styles.ninjamanContainer}>
        {currentPage === "home" && (
          <NinjamanHome setCurrentPage={setCurrentPage} {...{data, revalidator}} />
        )}
        {currentPage === "instructions" && (
          <NinjamanInstructions setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "game" && (<Suspense fallback={<NinjamanGameLoading />}><NinjamanGame {...{data, revalidator}} /></Suspense>)}
      </div>
    </AsobiLayout>
  );
}

