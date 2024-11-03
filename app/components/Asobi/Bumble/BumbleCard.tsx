import { motion, Variants } from "framer-motion";
import { useState, KeyboardEvent as ReactKeyboardEvent } from "react";

import styles from "@/styles/Bumble.module.scss";
import charaDataCG from "@/data/charaIdToCard.json";
import {
  IconRulerMeasure,
  IconSchool,
  IconZodiacAquarius,
  IconZodiacAries,
  IconZodiacCancer,
  IconZodiacCapricorn,
  IconZodiacGemini,
  IconZodiacLeo,
  IconZodiacLibra,
  IconZodiacPisces,
  IconZodiacSagittarius,
  IconZodiacScorpio,
  IconZodiacTaurus,
  IconZodiacVirgo,
} from "@tabler/icons-react";
import { cmToFeet } from "@/utilities";

const horoscopeData = [
  {
    name: "Aries",
    icon: <IconZodiacAries size={16} />,
  },
  {
    name: "Taurus",
    icon: <IconZodiacTaurus size={16} />,
  },
  {
    name: "Gemini",
    icon: <IconZodiacGemini size={16} />,
  },
  {
    name: "Cancer",
    icon: <IconZodiacCancer size={16} />,
  },
  {
    name: "Leo",
    icon: <IconZodiacLeo size={16} />,
  },
  {
    name: "Virgo",
    icon: <IconZodiacVirgo size={16} />,
  },
  {
    name: "Libra",
    icon: <IconZodiacLibra size={16} />,
  },
  {
    name: "Scorpio",
    icon: <IconZodiacScorpio size={16} />,
  },
  {
    name: "Sagittarius",
    icon: <IconZodiacSagittarius size={16} />,
  },
  {
    name: "Capricorn",
    icon: <IconZodiacCapricorn size={16} />,
  },
  {
    name: "Aquarius",
    icon: <IconZodiacAquarius size={16} />,
  },
  {
    name: "Pisces",
    icon: <IconZodiacPisces size={16} />,
  },
];

export function DatingCard({
  charaData,
  direction,
}: {
  charaData: JPCharacterData;
  direction: number;
}) {
  const ANIMATION_DURATION = 0.8;
  const ANIMATION_SHIFT = 800;

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? ANIMATION_SHIFT : ANIMATION_SHIFT * -1,
      opacity: 0,
      transition: {
        delay: ANIMATION_DURATION * 2,
      },
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: ANIMATION_SHIFT * direction,
      rotate: 150 * direction,
      opacity: 0,
      transition: {
        duration: ANIMATION_DURATION,
        opacity: {
          duration: ANIMATION_DURATION / 4,
        },
      },
    }),
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const characterAge: number =
    Number(charaData.age) + (Number(charaData.age) < 17 ? 2 : 1);

  return (
    <motion.div
      key={charaData.character_id}
      className={styles.cardContainer}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div
        className={`${styles.card}${isFlipped ? ` ${styles.isFlipped}` : ""}`}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(event: ReactKeyboardEvent) => {
          if (event.key === "Enter") {
            setIsFlipped((prev) => !prev);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className={`${styles.cardBase} ${styles.cardFront}`}>
          <div className={styles.cardCharaInfo}>
            <div className={styles.charaBasicInfo}>
              <span className={styles.name}>{charaData.first_name}</span>,{" "}
              <span>{characterAge}</span>
            </div>
            <div className={styles.charaTagline}>{charaData.tagline}</div>
          </div>
          <img
            src={`https://assets.enstars.link/assets/card_rectangle4_${
              charaDataCG[
                String(charaData.character_id) as keyof typeof charaDataCG
              ]
            }_normal.webp`}
            alt={charaData.first_name}
            width={640}
            height={800}
          />
        </div>
        <div className={`${styles.cardBase} ${styles.cardBack}`}>
          <div className={styles.cardBackContainer}>
            <div className={styles.cardBackTitle}>
              About {charaData.first_name}
            </div>
            <div className={styles.charaBasicInfo}>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  <IconRulerMeasure size={14} />
                </div>
                <div className={styles.charaInfoPilLText}>
                  {charaData.height}cm / {cmToFeet(charaData.height)}
                </div>
              </div>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  {horoscopeData[charaData.horoscope]?.icon}
                </div>
                <div className={styles.charaInfoPilLText}>
                  {horoscopeData[charaData.horoscope]?.name}
                </div>
              </div>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  <IconSchool size={14} />
                </div>
                <div className={styles.charaInfoPilLText}>
                  {charaData.school
                    ? "In school"
                    : charaData.character_id === 71 ||
                        charaData.character_id === 74
                      ? "Not in school"
                      : "Graduated"}
                </div>
              </div>
            </div>
            {charaData.like && (
              <>
                <div className={styles.promptContainer}>
                  <div className={styles.charaPrompt}>
                    Their favorite thing in the world is...
                  </div>
                  <div className={styles.charaAnswer}>{charaData.like}</div>
                </div>
              </>
            )}
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>
                Their favorite hobby is...
              </div>
              <div className={styles.charaAnswer}>{charaData.hobby}</div>
            </div>
            <div className={styles.charaPromptImage}>
              <img
                src={`https://assets.enstars.link/assets/card_still_full1_${
                  charaData.cards?.[charaData.character_id === 74 ? 1 : 0]
                }_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>They love to eat...</div>
              <div className={styles.charaAnswer}>
                {charaData.favorite_food}
              </div>
            </div>
            <div className={styles.charaPromptImage}>
              <img
                src={`https://assets.enstars.link/assets/card_still_full1_${
                  charaData.cards?.[
                    charaData.character_id === 51 ||
                    charaData.character_id === 72 ||
                    charaData.character_id === 15
                      ? 1
                      : 2
                  ]
                }_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>They are an expert at...</div>
              <div className={styles.charaAnswer}>{charaData.specialty}</div>
            </div>
            {charaData.dislike && (
              <div className={styles.promptContainer}>
                <div className={styles.charaPrompt}>
                  They absolutely hate...
                </div>
                <div className={styles.charaAnswer}>{charaData.dislike}</div>
              </div>
            )}
            <div className={styles.charaPromptImage}>
              <img
                src={`https://assets.enstars.link/assets/card_still_full1_${
                  charaData.cards?.[charaData.character_id === 8 ? 3 : 4]
                }_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>
                Some words they want to get in
              </div>
              <div className={styles.charaAnswer}>
                &quot;{charaData.quote}&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
