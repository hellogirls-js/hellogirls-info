import React from "react";
import styles from "./styles.module.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import About from "./components/About";
import { motion, useTime, useTransform } from "motion/react";
import FlowerSVG from "./components/FlowerSVG";
import {
  useElementSize,
  useInterval,
  useTimeout,
  useViewportSize,
} from "@mantine/hooks";

const FLOWER_COLORS = [
  {
    petals: "#ffe252",
    middle: "#ffa552",
  },
  {
    petals: "#fffdf7",
    middle: "#ffc21c",
  },
  {
    petals: "#d3e381",
    middle: "#ffb0d2",
  },
  {
    petals: "#98a9f5",
    middle: "#f5d176",
  },
  {
    petals: "#be89d9",
    middle: "#e1eb88",
  },
];

function FallingFlower({
  id,
  onReachEnd,
}: {
  id: number;
  fullHeight: number;
  onReachEnd: (size: number) => void;
}) {
  const time = useTime();
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();

  const ROTATION_SPEED = React.useRef(
    Math.round(Math.random() * (6000 - 3000) + 3000),
  );
  const X_DISTANCE_RANDOMNESS = React.useRef(Math.random());
  const FLOWER_COLOR = React.useRef(
    FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
  );

  const yDistance = useTransform(time, [0, 20000], [0, viewportHeight]);
  const rotation = useTransform(time, [0, ROTATION_SPEED.current], [0, 360], {
    clamp: false,
  });

  const { start: trackLifespan, clear: clearLifespanTracker } = useTimeout(
    () => {
      onReachEnd(id);
    },
    20000,
  );

  React.useEffect(() => {
    trackLifespan();

    return () => {
      clearLifespanTracker();
    };
  }, []);

  const FLOWER_SIZE = React.useMemo(
    () => Math.round(Math.random() * (100 - 50) + 50),
    [],
  );

  const X_DISTANCE = React.useMemo(
    () => X_DISTANCE_RANDOMNESS.current * viewportWidth,
    [viewportWidth],
  );

  if (!viewportWidth) return <></>;

  return (
    <motion.div
      className={styles.fallingFlower}
      style={{
        width: FLOWER_SIZE,
        height: FLOWER_SIZE,
        y: yDistance,
        left: X_DISTANCE,
        top: 0,
        rotate: rotation,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FlowerSVG
        petalsColor={FLOWER_COLOR.current.petals}
        middleColor={FLOWER_COLOR.current.middle}
        size={{ width: FLOWER_SIZE, height: FLOWER_SIZE }}
      />
    </motion.div>
  );
}

export default function Index() {
  const birthday = React.useRef(
    (import.meta.env as ImportMetaEnv).BIRTHDAY ?? "",
  );

  const [fallingFlowers, setFallingFlowers] = React.useState([Date.now()]);

  const fallingFlowersInterval = useInterval(
    () => {
      setFallingFlowers((prev) => {
        if (prev.length < 10) {
          return [...prev, Date.now()];
        }
        return prev;
      });
    },
    3000,
    { autoInvoke: true },
  );

  React.useEffect(() => {
    return () => {
      fallingFlowersInterval.stop();
    };
  }, []);

  React.useEffect(() => {
    if (import.meta.env.BIRTHDAY?.length)
      birthday.current = import.meta.env.BIRTHDAY;
  }, [import.meta.env]);

  const { ref: fallingFlowersRef, height: fallingFlowersHeight } =
    useElementSize();

  const onReachEnd = (currentId: number) => {
    setFallingFlowers((prev) => {
      return prev.filter((id) => id !== currentId);
    });
  };

  return (
    <>
      <title>hellogirls.info!</title>
      <main className={styles.main}>
        <div ref={fallingFlowersRef} className={styles.fallingFlowers}>
          {fallingFlowers.map((id) => {
            return (
              <FallingFlower
                key={id.toString()}
                fullHeight={fallingFlowersHeight}
                {...{ onReachEnd, id }}
              />
            );
          })}
        </div>
        <Menu />
        <Header />
        <About />
      </main>
    </>
  );
}
