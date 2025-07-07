import React from "react";
import styles from "../styles.module.scss";
import { motion, useScroll, useTransform } from "motion/react";
import { useViewportSize } from "@mantine/hooks";
import dayjs from "dayjs";
import {
  IconDeviceLaptop,
  IconMapPin,
  IconSignature,
  IconZodiacAries,
} from "@tabler/icons-react";

const BORDER_COLORS = ["#ffe6f8", "#f3ffc7", "#cce4ff", "#f7d1ff"];

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
      viewportHeight * (index + 1) + viewportHeight / 20,
      viewportHeight * (index + 2) - viewportHeight / 20,
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

  const shouldBeGreen = index === 1 || index === 2;

  const DARK_GREEN_BG = "#829953";
  const DARK_GREEN_TEXT = "#e9f5b5";

  const DARK_BROWN_BG = "#cc7e64";
  const DARK_BROWN_TEXT = "#f5d9b5";

  return (
    <motion.div
      className={styles.aboutCard}
      style={{
        y: cardYPosition,
        visibility: cardVisibility,
        backgroundColor: shouldBeGreen ? DARK_GREEN_BG : DARK_BROWN_BG,
      }}
    >
      <motion.div
        className={styles.aboutCardIcon}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
      >
        {section.icon}
      </motion.div>
      <div className={styles.aboutCardContent} style={{ color: "#fff" }}>
        <div
          className={styles.aboutCardTitle}
          style={{ color: shouldBeGreen ? DARK_GREEN_TEXT : DARK_BROWN_TEXT }}
        >
          {section.title}
        </div>
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
    ["0px", "80px"],
  );

  const headingUnderlineVisibility = useTransform(
    scrollY,
    [
      0,
      viewportHeight + viewportHeight / 10,
      viewportHeight + viewportHeight / 10 + 150,
    ],
    ["0%", "0%", "100%"],
  );

  const aboutCardsVisibility = useTransform(
    scrollY,
    [0, viewportHeight, viewportHeight * 7],
    ["none", "grid", "none"],
  );

  const aboutContainerVisibility = useTransform(
    scrollY,
    [0, viewportHeight - 50, viewportHeight * 7],
    ["absolute", "fixed", "absolute"],
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
      <motion.div
        layout
        className={styles.aboutContainer}
        style={{ position: aboutContainerVisibility }}
      >
        <motion.div
          layout
          className={styles.aboutHeadingContainer}
          style={{ height: headingVisibility }}
        >
          <motion.h2 layout className={styles.aboutHeading}>
            Who am I?
          </motion.h2>
          <motion.div
            className={styles.aboutHeadingUnderline}
            style={{ scaleX: headingUnderlineVisibility }}
          />
        </motion.div>
        <motion.div
          className={styles.aboutCardsContainer}
          style={{ display: aboutCardsVisibility }}
        >
          {ABOUT_SECTIONS.map((section, index) => {
            return <AboutCard key={section.title} {...{ index, section }} />;
          })}
        </motion.div>
        <motion.div layout></motion.div>
      </motion.div>
    </motion.section>
  );
}
