import React from "react";
import styles from "../styles.module.scss";
import { motion, useScroll, useTransform, useVelocity } from "motion/react";
import { useViewportSize } from "@mantine/hooks";
import dayjs from "dayjs";
import {
  IconDeviceLaptop,
  IconMapPin,
  IconSignature,
  IconZodiacAries,
} from "@tabler/icons-react";

const BORDER_COLORS = ["#f589d6", "#a6c240", "#6eadf5", "#dd74f2"];

function AboutCard({
  index,
  section,
}: {
  index: number;
  section: { title: string; value: string; icon: React.ReactElement };
}) {
  const { scrollY } = useScroll();
  const { height: viewportHeight } = useViewportSize();

  const cardYPosition = useTransform(
    scrollY,
    [
      viewportHeight * (index + 1) + viewportHeight / 10,
      viewportHeight * (index + 2),
    ],
    [900, 0],
  );
  const cardVisibility = useTransform(() => {
    if (scrollY.get() >= viewportHeight + viewportHeight / 10) {
      return "visible";
    } else {
      return "hidden";
    }
  });

  return (
    <motion.div
      className={styles.aboutCard}
      style={{
        y: cardYPosition,
        visibility: cardVisibility,
      }}
    >
      <motion.div
        className={styles.aboutCardIcon}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
      >
        {section.icon}
      </motion.div>
      <div className={styles.aboutCardContent}>
        <div className={styles.aboutCardTitle}>{section.title}</div>
        <div className={styles.aboutCardValue}>{section.value}</div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { scrollY } = useScroll();

  const { height: viewportHeight } = useViewportSize();

  const headingVisibility = useTransform(
    scrollY,
    [viewportHeight, viewportHeight + viewportHeight / 10],
    ["0px", "55px"],
  );

  const ABOUT_SECTIONS: Array<{
    title: string;
    value: string;
    icon: React.ReactElement;
  }> = React.useMemo(
    () => [
      {
        title: "Nickname",
        value: "Son",
        icon: (
          <IconSignature color={BORDER_COLORS[0]} strokeWidth={1} size={64} />
        ),
      },
      {
        title: "Age",
        value: `${dayjs(import.meta.env.BIRTHDAY).diff(dayjs(), "years")} years old`,
        icon: (
          <IconZodiacAries color={BORDER_COLORS[1]} strokeWidth={1} size={64} />
        ),
      },
      {
        title: "Location",
        value: "Chicago, IL",
        icon: <IconMapPin color={BORDER_COLORS[2]} strokeWidth={1} size={64} />,
      },
      {
        title: "Professional web developer for",
        value: `${dayjs().diff(dayjs("2022-06-01"), "years")} years`,
        icon: (
          <IconDeviceLaptop
            color={BORDER_COLORS[3]}
            strokeWidth={1}
            size={64}
          />
        ),
      },
    ],
    [dayjs, import.meta.env],
  );

  return (
    <motion.section className={styles.aboutScrollContainer}>
      <motion.div layout className={styles.aboutContainer}>
        <motion.div
          layout
          className={styles.aboutHeadingContainer}
          style={{ height: headingVisibility }}
        >
          <motion.h2 layout className={styles.aboutHeading}>
            Who am I?
          </motion.h2>
        </motion.div>
        <div className={styles.aboutCardsContainer}>
          {ABOUT_SECTIONS.map((section, index) => {
            return <AboutCard key={section.title} {...{ index, section }} />;
          })}
        </div>
        <motion.div layout></motion.div>
      </motion.div>
    </motion.section>
  );
}
