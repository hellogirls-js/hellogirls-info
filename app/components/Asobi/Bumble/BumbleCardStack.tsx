import { Dispatch, SetStateAction, Suspense } from "react";
import styles from "@/styles/Bumble.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { DatingCard } from "./BumbleCard";
import { useTimeout } from "@mantine/hooks";
import charaDataCG from "@/data/charaIdToCard.json";
import { useQuery } from "@tanstack/react-query";
import { SupabaseClient } from "@supabase/supabase-js";

function MissedMatchNotif({
  chara,
  setShowMissedMatchNotif,
}: {
  chara: JPCharacterData;
  setShowMissedMatchNotif: Dispatch<SetStateAction<boolean>>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { start } = useTimeout(
    () => {
      setShowMissedMatchNotif(false);
    },
    3000,
    { autoInvoke: true },
  );

  return (
    <motion.div
      className={styles.missedMatchContainer}
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className={styles.missedMatchIcon}>
        <img
          alt={chara.first_name}
          src={`https://assets.enstars.link/assets/card_rectangle4_${
            charaDataCG[String(chara.character_id) as keyof typeof charaDataCG]
          }_normal.webp`}
          width={640}
          height={800}
        />
      </div>
      <div className={styles.missedMatchText}>
        You missed a potential match!
      </div>
    </motion.div>
  );
}

function ChoicePoll({
  chara,
  setShowChoiceNotif,
  supabase,
}: {
  chara: JPCharacterData;
  setShowChoiceNotif: Dispatch<
    SetStateAction<{ charaId: number; choice: boolean } | undefined>
  >;
  supabase: SupabaseClient;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { start } = useTimeout(() => setShowChoiceNotif(undefined), 3000, {
    autoInvoke: true,
  });

  const { data: charaResults } = useQuery({
    queryKey: ["getCharaResults", chara.character_id],
    queryFn: async () => {
      const likes = await supabase
        .from("lipbite")
        .select("*", { count: "exact", head: true })
        .eq("character_id", chara.character_id)
        .eq("choice", true);
      const passes = await supabase
        .from("lipbite")
        .select("*", { count: "exact", head: true })
        .eq("character_id", chara.character_id)
        .eq("choice", false);

      return {
        likes: likes.count ?? 0,
        passes: passes.count ?? 0,
        total: (likes.count ?? 0) + (passes.count ?? 0),
      };
    },
  });

  return (
    <motion.div
      className={styles.choicePollContainer}
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.choicePollTitle}>
        <h3>{chara.first_name}</h3>
        <img
          src={`https://assets.enstars.link/assets/character_sd_square1_${chara.character_id}.png`}
          alt={"character chibi head"}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.choicePollResults}>
        <div
          className={`${styles.choicePollResultContainer} ${styles.choicePollLikeContainer}`}
        >
          <motion.div
            className={`${styles.choicePollBar} ${styles.choicePollLikeBar}`}
            initial={{ width: 0 }}
            animate={{
              width: charaResults
                ? `${(charaResults.likes / charaResults.total) * 100}%`
                : "0%",
              transition: {
                duration: 0.5,
              },
            }}
          >
            {charaResults
              ? ((charaResults.likes / charaResults.total) * 100).toFixed(1)
              : 0}
            %
          </motion.div>
          <div className={styles.choicePollLabel}>
            Like
            <div className={styles.choicePollData}>
              {charaResults?.likes} votes
            </div>
          </div>
        </div>
        <div
          className={`${styles.choicePollResultContainer} ${styles.choicePollPassContainer}`}
        >
          <motion.div
            className={`${styles.choicePollBar} ${styles.choicePollPassBar}`}
            initial={{ width: 0 }}
            animate={{
              width: charaResults
                ? `${(charaResults.passes / charaResults.total) * 100}%`
                : "0%",
              transition: {
                duration: 0.5,
              },
            }}
          >
            {charaResults
              ? ((charaResults.passes / charaResults.total) * 100).toFixed(1)
              : 0}
            %
          </motion.div>
          <div className={styles.choicePollLabel}>
            Pass
            <div className={styles.choicePollData}>
              {charaResults?.passes} votes
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CardStack({
  charaList,
  direction,
  index,
  showChoiceNotif,
  showMissedMatchNotif,
  setShowMissedMatchNotif,
  setShowChoiceNotif,
  supabase,
}: {
  charaList: JPCharacterData[];
  direction: number;
  index: number;
  showChoiceNotif: { charaId: number; choice: boolean } | undefined;
  showMissedMatchNotif: boolean;
  setShowMissedMatchNotif: Dispatch<SetStateAction<boolean>>;
  setShowChoiceNotif: Dispatch<
    SetStateAction<{ charaId: number; choice: boolean } | undefined>
  >;
  supabase: SupabaseClient;
}) {
  return (
    <div className={styles.cardStackContainer}>
      <div className={styles.cardStack}>
        <AnimatePresence>
          {showChoiceNotif && index > 0 && (
            <ChoicePoll
              key={`${showChoiceNotif.charaId}_poll`}
              chara={
                charaList[
                  charaList.findIndex(
                    (chara) => chara.character_id === showChoiceNotif.charaId,
                  )
                ]
              }
              {...{ setShowChoiceNotif, supabase }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showMissedMatchNotif && index > 0 && (
            <MissedMatchNotif
              key={`${charaList[index - 1].character_id}_missed`}
              chara={charaList[index - 1]}
              {...{ setShowMissedMatchNotif }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence custom={direction}>
          {index < charaList.length && (
            <DatingCard
              key={charaList[index].character_id}
              charaData={charaList[index]}
              {...{ direction }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
