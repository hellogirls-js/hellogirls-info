import { IconHeart } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Dispatch } from "react";
import charaDataCG from "@/data/charaIdToCard.json";
import styles from "@/styles/Bumble.module.scss";

export default function MatchScreen({
  chara,
  dispatch,
}: {
  chara: JPCharacterData;
  dispatch: Dispatch<CardAction>;
}) {
  return (
    <motion.div
      className={styles.matchScreenContainer}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ scale: 0, opacity: 0, y: 400 }}
    >
      <motion.div className={styles.matchHeader}>
        <div className={styles.matchTitle}>You matched!</div>
      </motion.div>
      <motion.div className={styles.matchBody}>
        <motion.div className={styles.graphicsContainer}>
          <motion.div
            className={styles.matchHeartContainer}
            initial={{ rotate: 0, opacity: 0, x: -100, y: -100, scale: 1.5 }}
            animate={{
              rotate: "10deg",
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: { delay: 1.75, duration: 0.2 },
            }}
          >
            <IconHeart size={128} />
          </motion.div>
          <motion.div
            className={styles.matchCharaContainer}
            initial={{ rotate: 0, opacity: 0, x: 200 }}
            animate={{
              rotate: "-10deg",
              opacity: 1,
              x: 0,
              transition: { delay: 1, duration: 0.5 },
            }}
          >
            {chara && (
              <div className={styles.matchChara}>
                <img
                  alt={chara?.first_name ?? "match"}
                  src={`https://assets.enstars.link/assets/card_rectangle4_${
                    charaDataCG[
                      String(chara.character_id) as keyof typeof charaDataCG
                    ]
                  }_normal.webp`}
                  width={640}
                  height={800}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.matchSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2.5, duration: 0.5 } }}
        >
          {chara?.first_name} likes you, too! You may receive a message from
          them later.
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.matchFooter}
        initial={{ opacity: 0, y: 300 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 3.5, duration: 0.5 },
        }}
      >
        <button
          className={styles.matchButton}
          onClick={() => {
            dispatch({
              type: "proceed",
              payload: chara.character_id,
            });
          }}
        >
          Awesome!
        </button>
      </motion.div>
    </motion.div>
  );
}
