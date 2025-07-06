import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import React from "react";

import styles from "../styles.module.scss";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import { IconHandClick, IconRotate360 } from "@tabler/icons-react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export default function Header() {
  const headerRef = React.useRef<HTMLElement>(null);
  const bgImageRef = React.useRef<HTMLImageElement>(null);

  const [shouldTilt, setShouldTilt] = React.useState(false);

  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const { scrollY } = useScroll();

  const isHeaderInView = useInView(headerRef);

  const bgImageRotateX = useMotionValue(0);
  const bgImageRotateY = useMotionValue(0);

  const bgPosition = useTransform(
    scrollY,
    [0, viewportHeight],
    ["-15vh", "15vh"],
  );

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!shouldTilt) return [0, 0];
    if (!bgImageRef.current) return [0, 0];

    const rect = bgImageRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    bgImageRotateX.set(rX);
    bgImageRotateY.set(rY);
  };

  const bgImageBrightnessValue = useTransform(
    scrollY,
    [0, viewportHeight / 3, viewportHeight],
    [1, 1, 0],
  );
  const bgImageBlurValue = useTransform(
    scrollY,
    [0, viewportHeight / 3, viewportHeight],
    [0, 0, 30],
  );
  const bgImageFilter = useMotionTemplate`brightness(${bgImageBrightnessValue}) blur(${bgImageBlurValue}px)`;

  // const textPosition = useTransform(() => scrollY.get() * -1.2);

  return (
    <motion.header ref={headerRef} className={styles.header}>
      <motion.div className={styles.headerTitle}>
        <h1 className={styles.headerTitleMain}>hellogirls</h1>
        <div className={styles.headerTitleSide}>.info</div>
      </motion.div>
      <motion.div
        style={{
          y: bgPosition,
        }}
        className={styles.headerBg}
        onClick={() => {
          console.log("click");
          setShouldTilt((prev) => !prev);
        }}
      >
        <motion.img
          ref={bgImageRef}
          onMouseMove={handleMouseMove}
          src="/flower_picture.png"
          style={{
            objectFit: "cover",
            marginLeft: "-2vw",
            rotateX: bgImageRotateX,
            rotateY: bgImageRotateY,
            filter: bgImageFilter,
          }}
          width={isPortrait ? "auto" : viewportWidth + viewportWidth / 3}
          height={isPortrait ? viewportHeight + viewportHeight / 3 : "auto"}
        />
      </motion.div>
      {isHeaderInView && (
        <>
          <div className={styles.photoCredit}>Photo taken by Son!</div>
          <div className={styles.showClickNotifContainer}>
            <AnimatePresence>
              {!shouldTilt && (
                <motion.div
                  className={styles.showClickNotif}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [null, 1.3] }}
                    transition={{
                      duration: 0.75,
                      repeat: Infinity,
                      repeatDelay: 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <IconHandClick strokeWidth={1} />
                  </motion.div>
                  <div>Click anywhere to enable tilting!</div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {shouldTilt && (
                <motion.div
                  className={styles.showClickNotif}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div>
                    <IconRotate360 strokeWidth={1} />
                  </div>
                  <div>Enjoy tilting!</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </motion.header>
  );
}
