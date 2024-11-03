import { NATSUME_SPRITE } from "@/utilities/fanquiz";
import styles from "@/styles/FanQuiz.module.scss";

export function QuizHeader({
  title,
  natsumeSprite = NATSUME_SPRITE,
}: {
  title: string;
  natsumeSprite?: string;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.nachumeContainer}>
        <img
          src={natsumeSprite}
          alt="dr. natsume"
          className={styles.nachumeImage}
        />
      </div>
      <div className={styles.speechBubbleContainer}>
        <p>{title}</p>
      </div>
    </div>
  );
}
