/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { IconHeart, IconX } from "@tabler/icons-react";
import { Dispatch, useCallback, useEffect, useReducer, useState } from "react";
import styles from "@/styles/Bumble.module.scss";
import { AnimatePresence } from "framer-motion";
import charaDataCG from "@/data/charaIdToCard.json";
import { json, useLoaderData, useRouteError } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import Div100vh from "react-div-100vh";
import { getData, shuffleArray } from "@/utilities";
import { CardStack } from "@/components/Asobi/Bumble/BumbleCardStack";
import MatchedMessages from "@/components/Asobi/Bumble/BumbleMatchedMessages";
import GameFooter from "@/components/Asobi/Bumble/GameFooter";
import GameHeader from "@/components/Asobi/Bumble/GameHeader";
import MatchScreen from "@/components/Asobi/Bumble/MatchScreen";
import { createBrowserClient } from "@supabase/ssr";
import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Bumble | ASOBI!" },
    { name: "description", content: "a tinder simulator with rinne" },
  ];
};

export async function loader() {
  const DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const JP_DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const CARD_DATA_URL = "https://data.ensemble.moe/ja/cards.json";

  let charaData: JPCharacterData[];
  const env = {
    QUIZ_SUPABASE_URL: process.env.PUBLIC_QUIZ_SUPABASE_URL!,
    QUIZ_API_KEY: process.env.PUBLIC_QUIZ_API_KEY!,
  };

  try {
    const enData = await getData(DATA_URL);
    const jpData = await getData(JP_DATA_URL);
    const cardData = await getData(CARD_DATA_URL);

    const dataWithAge = (enData as EnCharacterData[])
      .filter((enChara) =>
        Object.keys(charaDataCG).includes(String(enChara.character_id)),
      )
      .map((enChara: EnCharacterData) => {
        const correspondingJpData = (jpData as JPCharacterData[]).find(
          (jpChara) => jpChara.character_id === enChara.character_id,
        );
        const fiveStarCards = cardData
          .filter(
            (card: any) =>
              card.rarity === 5 &&
              card.character_id === enChara.character_id &&
              card.id !==
                Number(
                  charaDataCG[
                    String(enChara.character_id) as keyof typeof charaDataCG
                  ],
                ),
          )
          .map((card: any) => card.id);
        return {
          ...enChara,
          height: correspondingJpData?.height,
          horoscope: correspondingJpData?.horoscope,
          age: correspondingJpData?.age,
          cards: fiveStarCards,
        };
      });

    const shuffledData = shuffleArray(dataWithAge);
    charaData = shuffledData as JPCharacterData[];
    return json({ charaData, env });
  } catch (error) {
    console.error("loader failed", error);
    return json({ charaData: [], env });
  }
}

export function HydrateFallback() {
  return (
    <Div100vh>
      <div className={styles.bumbleContainer}>
        <p>Loading Game...</p>
      </div>
    </Div100vh>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  console.error("could not load page: ", error);
  return <p>An error occurred! {error.message}</p>;
}

function reducer(state: CardState, action: CardAction): CardState {
  const { type, payload } = action;
  let shouldMatch: boolean;
  switch (type) {
    case "smash":
      shouldMatch = Math.ceil(Math.random() * 3) % 2 === 1;
      return {
        ...state,
        index: !shouldMatch ? state.index + 1 : state.index,
        smashList: [...state.smashList, Number(payload)],
        matchList: shouldMatch
          ? [...state.matchList, Number(payload)]
          : state.matchList,
        direction: 1,
        choice: !shouldMatch ? Number(payload) : 0,
      };
    case "pass":
      return {
        ...state,
        passList: [...state.passList, Number(payload)],
        direction: -1,
      };
    case "reset":
      return {
        ...state,
        passList: [],
        smashList: [],
        direction: 0,
        index: 0,
      };
    case "proceed":
      return {
        ...state,
        index: state.index + 1,
        choice: Number(payload),
      };
    default:
      return state;
  }
}

function Buttons({
  dispatch,
  charaList,
  index,
}: {
  dispatch: Dispatch<CardAction>;
  charaList: JPCharacterData[];
  index: number;
}) {
  function LikeButton() {
    return (
      <button
        className={`${styles.dateButton} ${styles.like}`}
        onClick={() => {
          dispatch({
            type: "smash",
            payload: charaList[index]?.character_id,
          });
        }}
      >
        <IconHeart size={48} />
        Like
      </button>
    );
  }

  function PassButton() {
    return (
      <button
        className={`${styles.dateButton} ${styles.pass}`}
        onClick={() => {
          dispatch({
            type: "pass",
            payload: charaList[index]?.character_id,
          });
        }}
      >
        <IconX size={48} />
        Pass
      </button>
    );
  }

  return (
    <div className={styles.buttonsContainer}>
      <PassButton />
      <LikeButton />
    </div>
  );
}

function Rinne({ sprite, dialogue }: { sprite: number; dialogue: string }) {
  return (
    <div className={styles.rinneContainer}>
      <div className={styles.rinneSpriteContainer}>
        <div className={styles.rinne}>
          <img
            width={580}
            height={690}
            src={`https://assets.hellogirls.info/asobi/bumble/asobi_rinne_${sprite}.png`}
            alt="rinne amagi"
          />
        </div>
      </div>
      <div className={styles.rinneDialogueContainer}>
        <div className={styles.rinneDialogue}>{dialogue}</div>
      </div>
    </div>
  );
}

export default function Dating() {
  const data = useLoaderData<typeof loader>();

  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    smashList: [],
    passList: [],
    matchList: [],
    direction: 0,
    choice: 0,
  });

  const charaData: JPCharacterData[] =
    (data.charaData as JPCharacterData[]) ?? [];
  const env = data.env;
  const supabase = createBrowserClient(env.QUIZ_SUPABASE_URL, env.QUIZ_API_KEY);

  enum RinneDialogue {
    START_DIALOGUE = "Tap the card to flip it over. C'mon~",
    PASS_DIALOGUE_1 = "Picky, huh?",
    PASS_DIALOGUE_2 = "Did they ick ya out?",
    LIKE_DIALOGUE_1 = "Kyahaha, nice pick!",
    LIKE_DIALOGUE_2 = "They're kinda cute, huh~? Just kidding, kyahaha!",
    NIKI_DIALOGUE = "Oi.",
    NIKI_DIALOGUE_LIKE = "Careful, Niki's mine.",
    NIKI_DIALOGUE_PASS = "What did you just say about Niki?",
    RINNE_DIALOGUE = "H-how did that...?!",
    RINNE_DIALOGUE_LIKE = "...",
    FINISHED_GOOD = "Well, well~ Look at all the lucky bachelors you racked up!",
    FINISHED_BAD = "No one? Poor thing, maybe l'il ol Rinne can cheer you up~",
  }

  const [showChoiceNotif, setShowChoiceNotif] = useState<{
    charaId: number;
    choice: boolean;
  }>();
  const [showMatchNotif, setShowMatchNotif] = useState(false);
  const [showMissedMatchNotif, setShowMissedMatchNotif] = useState(false);
  const [rinneSprite, setRinneSprite] = useState(1);
  const [rinneDialogue, setRinneDialogue] = useState(
    RinneDialogue.START_DIALOGUE,
  );
  const [showRinne, setShowRinne] = useState(true);

  const { mutate: addVoteForChara } = useMutation({
    mutationFn: async (values: { charaId: number; choice: boolean }) => {
      const { error } = await supabase.from("lipbite").insert({
        character_id: values.charaId,
        choice: values.choice,
      });

      if (error) throw new Error(error.message);
    },
    onSuccess: (data: any, values: { charaId: number; choice: boolean }) => {
      setShowChoiceNotif(values);
    },
    onError: (error: Error) => {
      console.error("could not add data to DB", error.message, error.cause);
    },
  });

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        dispatch({
          type: "smash",
          payload: charaData[state.index].character_id,
        });
      }
      if (e.key === "ArrowLeft") {
        dispatch({
          type: "pass",
          payload: charaData[state.index].character_id,
        });
      }
    },
    [charaData, state.index],
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    if (state.smashList.length) {
      const mostRecentIndex = state.smashList.length - 1;
      if (state.smashList[mostRecentIndex] === 74) {
        setRinneDialogue(RinneDialogue.NIKI_DIALOGUE_LIKE);
      } else if (state.smashList[mostRecentIndex] === 71) {
        setRinneDialogue(RinneDialogue.RINNE_DIALOGUE_LIKE);
      } else {
        if (
          charaData[state.index]?.character_id !== 71 &&
          charaData[state.index]?.character_id !== 74
        ) {
          const randomChoice = Math.round(Math.random() * 10);
          if (randomChoice % 2 === 0) {
            setRinneDialogue(RinneDialogue.LIKE_DIALOGUE_1);
          } else {
            setRinneDialogue(RinneDialogue.LIKE_DIALOGUE_2);
          }
        }
      }
    }
  }, [state.smashList]);

  useEffect(() => {
    if (state.passList.length) {
      const mostRecentIndex = state.passList.length - 1;
      if (state.passList[mostRecentIndex] === 74) {
        setRinneDialogue(RinneDialogue.NIKI_DIALOGUE_PASS);
      } else if (state.passList[mostRecentIndex] === 71) {
        setRinneDialogue(RinneDialogue.RINNE_DIALOGUE_LIKE);
      } else {
        if (
          charaData[state.index].character_id !== 71 &&
          charaData[state.index].character_id !== 74
        ) {
          const randomChoice = Math.round(Math.random() * 10);
          if (randomChoice % 2 === 0) {
            setRinneDialogue(RinneDialogue.PASS_DIALOGUE_1);
          } else {
            setRinneDialogue(RinneDialogue.PASS_DIALOGUE_2);
          }
        }
      }
      dispatch({
        type: "proceed",
        payload: state.passList[mostRecentIndex] * -1,
      });
    }
  }, [state.passList]);

  useEffect(() => {
    if (state.matchList.length) {
      setShowMatchNotif(true);
    }
  }, [state.matchList, setShowMatchNotif]);

  useEffect(() => {
    setShowMatchNotif(false);
    setShowMissedMatchNotif(false);
    if (state.index < charaData.length) {
      if (
        state.passList.length &&
        charaData[state.index - 1]?.character_id ===
          state.passList[state.passList.length - 1]
      ) {
        const random = Math.ceil(Math.random() * 4);
        if (random === 2) setShowMissedMatchNotif(true);
      }
      if (
        charaData[state.index].character_id === 71 ||
        (state.index > 0 && charaData[state.index - 1].character_id === 71)
      ) {
        // if you're on rinne
        if (charaData[state.index].character_id === 71) {
          setRinneSprite(2);
          setRinneDialogue(RinneDialogue.RINNE_DIALOGUE);
        } else {
          if (state.passList[state.passList.length - 1] === 71) {
            setRinneSprite(3);
          }
        }
      } else if (
        (state.index > 0 && charaData[state.index - 1].character_id === 74) ||
        charaData[state.index].character_id === 74
      ) {
        // if you make any choice regarding niki
        setRinneSprite(3);
        if (charaData[state.index].character_id === 74) {
          setRinneDialogue(RinneDialogue.NIKI_DIALOGUE);
        }
      } else {
        if (rinneSprite !== 1) setRinneSprite(1);
      }
    } else {
      setRinneSprite(1);
      if (state.matchList.length) {
        setRinneDialogue(RinneDialogue.FINISHED_GOOD);
      } else {
        setRinneDialogue(RinneDialogue.FINISHED_BAD);
      }
    }
  }, [state.index]);

  useEffect(() => {
    if (state.index > 0 && state.choice !== 0) {
      addVoteForChara({
        charaId: charaData[state.index - 1].character_id,
        choice: state.choice > 0,
      });
    }
  }, [state.choice]);

  return (
    <div className={styles.bumbleContainer}>
      <GameHeader />
      <GameFooter />
      <AnimatePresence>
        {showMatchNotif && (
          <MatchScreen chara={charaData[state.index]} {...{ dispatch }} />
        )}
      </AnimatePresence>
      <main>
        <div className={styles.gameContainer}>
          {showRinne && <Rinne sprite={rinneSprite} dialogue={rinneDialogue} />}
          {state.index < charaData.length && (
            <>
              <CardStack
                charaList={charaData}
                direction={state.direction}
                index={state.index}
                {...{
                  showMissedMatchNotif,
                  setShowMissedMatchNotif,
                  setShowChoiceNotif,
                  showChoiceNotif,
                  supabase,
                }}
              />
              <Buttons
                charaList={charaData}
                index={state.index}
                {...{ dispatch }}
              />
            </>
          )}
          {state.index >= charaData.length && (
            <div className={styles.messages}>
              <MatchedMessages
                {...{ charaData, setShowRinne }}
                matches={state.matchList}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
