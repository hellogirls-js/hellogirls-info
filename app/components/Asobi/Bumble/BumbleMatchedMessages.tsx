import { IconChevronLeft, IconSend } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useState,
} from "react";
import charaIdToMessage from "@/data/charaIdToMessage.json";
import charaDataCG from "@/data/charaIdToCard.json";
import styles from "@/styles/Bumble.module.scss";

export default function MatchedMessages({
  matches,
  charaData,
  setShowRinne,
}: {
  matches: number[];
  charaData: JPCharacterData[];
  setShowRinne: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedChara, setSelectedChara] = useState<number>();

  useEffect(() => {
    if (selectedChara) setShowRinne(false);
    else setShowRinne(true);
  }, [selectedChara, setShowRinne]);

  const selectedCharaData =
    charaData.find((chara) => chara.character_id === selectedChara) ??
    undefined;

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messageContainerHeader}>
        <AnimatePresence>
          {selectedCharaData && (
            <motion.button
              className={styles.messageContainerHeaderBack}
              onClick={() => setSelectedChara(undefined)}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              <IconChevronLeft size={32} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className={styles.messageContainerHeaderTitle}>
          {selectedCharaData ? selectedCharaData.first_name : "Matches"}
        </div>
      </div>
      <div className={styles.messageContainerBody}>
        <AnimatePresence>
          {selectedChara ? (
            <motion.div
              key="DM"
              className={styles.matchDmContainer}
              initial={{ x: 700 }}
              animate={{ x: 0 }}
              exit={{ x: 700 }}
            >
              <div className={styles.matchDmMessageContainer}>
                <div className={styles.matchDmMessage}>
                  <div className={styles.matchDmIcon}>
                    <img
                      alt={selectedCharaData?.first_name ?? "match"}
                      src={`https://assets.enstars.link/assets/card_rectangle4_${
                        charaDataCG[
                          String(selectedChara) as keyof typeof charaDataCG
                        ]
                      }_normal.webp`}
                      width={640}
                      height={800}
                    />
                  </div>
                  <div className={styles.matchDmContent}>
                    {
                      charaIdToMessage[
                        String(selectedChara) as keyof typeof charaIdToMessage
                      ]
                    }
                    {selectedChara === 16 && (
                      <img
                        alt="koga and leon :)"
                        src="https://static.wikia.nocookie.net/ensemble-stars/images/c/ca/%28Wolf_Corgi%29_Koga_Oogami_CG.png/revision/latest/scale-to-width-down/1000?cb=20190509032324"
                        width={1000}
                        height={563}
                      />
                    )}
                    {selectedChara === 41 && (
                      <img
                        alt="bloody mary"
                        src="https://i.ibb.co/ZKXj1wR/bloody-mary.png"
                        width={261}
                        height={165}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.matchDmControlsContainer}>
                <textarea className={styles.matchDmTextarea} rows={1} />
                <button className={styles.matchDmSendButton}>
                  <IconSend />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className={styles.matchesListContainer}
              initial={{ x: -700 }}
              animate={{ x: 0 }}
              exit={{ x: -700 }}
            >
              {matches.map((match, index) => {
                const matchingCharaData = charaData.find(
                  (chara) => chara.character_id === match,
                );
                return (
                  <div
                    key={match}
                    className={styles.matchItemContainer}
                    onClick={() => setSelectedChara(match)}
                    onKeyUp={(event: ReactKeyboardEvent) => {
                      if (event.key === "Enter") {
                        setSelectedChara(match);
                      }
                    }}
                    role="button"
                    tabIndex={index}
                  >
                    <div className={styles.matchItemIcon}>
                      <img
                        alt={matchingCharaData?.first_name ?? "match"}
                        src={`https://assets.enstars.link/assets/card_rectangle4_${
                          charaDataCG[String(match) as keyof typeof charaDataCG]
                        }_normal.webp`}
                        width={640}
                        height={800}
                      />
                    </div>
                    <div className={styles.matchItemText}>
                      <div className={styles.matchItemName}>
                        {matchingCharaData?.first_name}
                      </div>
                      <div className={styles.matchItemPreview}>
                        {
                          charaIdToMessage[
                            String(match) as keyof typeof charaIdToMessage
                          ]
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
