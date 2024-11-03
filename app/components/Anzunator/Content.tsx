import { Suspense, useState } from "react";
import Introduction from "@/components/Anzunator/Introduction";
import Quiz from "@/components/Anzunator/Quiz";
import Match from "@/components/Anzunator/Match";

export default function Content({
  setImage,
  enData,
}: {
  setImage: any;
  enData: any[];
}) {
  const [startQuiz, setStart] = useState(false);
  const [matchFound, setFoundMatch] = useState(false);
  const [characterMatch, setCharaMatch] = useState();

  return (
    <>
      {!startQuiz && !matchFound ? (
        <Introduction setStart={setStart} />
      ) : startQuiz && !matchFound ? (
        <Suspense fallback={<p>Loading...</p>}>
          <Quiz
            setImage={setImage}
            setCharaMatch={setCharaMatch}
            setFoundMatch={setFoundMatch}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <Match chara={characterMatch} enData={enData} setImage={setImage} />
        </Suspense>
      )}
    </>
  );
}
