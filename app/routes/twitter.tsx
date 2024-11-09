import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import styles from "@/styles/Twitter.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconAsterisk,
  IconCircleCheck,
  IconCode,
  IconSignature,
  IconZodiacAries,
} from "@tabler/icons-react";
import { useInterval, useListState } from "@mantine/hooks";
import { computeAge } from "@/utilities";

export function loader({ context }: LoaderFunctionArgs) {
  return json({ birthday: context.cloudflare.env.BIRTHDAY });
}

function Sparkle({ x, y }: { x: number; y: number }) {
  return (
    <AnimatePresence>
      <motion.span
        className={styles.sparkle}
        style={{
          left: x,
          top: y,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: Math.random(), scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <IconAsterisk size={8} color="white" />
      </motion.span>
    </AnimatePresence>
  );
}

const sections = ["about", "byf", "rules", "links"];
type Section = (typeof sections)[number];

export default function Twitter() {
  const env = useLoaderData<typeof loader>();
  const birthdayRef = useRef(env.birthday as string);

  const [vw, setVw] = useState<number>();
  const [vh, setVh] = useState<number>();

  const [sparklePlacements, sparklesHandler] = useListState<{
    x: number;
    y: number;
  }>([]);

  const addSparkleInterval = useCallback(() => {
    if (vw && vh) {
      if (sparklePlacements.length > Math.ceil((vw ?? 750) / 15)) {
        sparklesHandler.remove(0);
      }
      const xCoord = Math.random() * vw;
      const yCoord = Math.random() * vh;
      sparklesHandler.append({ x: xCoord, y: yCoord });
    }
  }, [vw, vh]);

  const removeSparkleInterval = useCallback(() => {
    sparklesHandler.remove(0);
  }, [sparklePlacements]);

  const addSparkle = useInterval(addSparkleInterval, 999);
  const removeSparkle = useInterval(removeSparkleInterval, 1000);

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);

    window.addEventListener("resize", () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    if (vw && vh && !addSparkle.active) {
      addSparkle.start();
    }
  }, [vw, vh]);

  useEffect(() => {
    if (
      sparklePlacements.length > Math.ceil((vw ?? 750) / 15) &&
      !removeSparkle.active
    ) {
      removeSparkle.start();
    }

    if (sparklePlacements.length === 0) {
      removeSparkle.stop();
    }
  }, [sparklePlacements]);

  useEffect(() => {
    if (env.birthday?.length) {
      birthdayRef.current = env.birthday;
    }
  }, [env]);

  return (
    <div className={styles.carrdPage}>
      <div className={styles.floatingNiki}>
        <img
          src="https://assets.enstars.link/assets/card_full1_3725_evolution.png"
          alt="niki :)"
        />
      </div>
      <main className={styles.carrdContainer}>
        <h1>about!</h1>
        <section className={styles.carrdSection}>
          <h2>basics</h2>
          <div className={styles.carrdPills}>
            <div className={styles.carrdPill}>
              <div className={styles.carrdPillIcon}>
                <IconSignature />
              </div>
              son
            </div>
            <div className={styles.carrdPill}>
              <div className={styles.carrdPillIcon}>
                <IconZodiacAries />
              </div>
              {computeAge(birthdayRef.current)} years old
            </div>
            <div className={styles.carrdPill}>
              <div className={styles.carrdPillIcon}>
                <IconCircleCheck />
              </div>
              she/he
            </div>
            <div className={styles.carrdPill}>
              <div className={styles.carrdPillIcon}>
                <IconCode />
              </div>
              javascript fiend
            </div>
          </div>
          <h2 style={{ margin: "2em 0em 1em 0em" }}>more!</h2>
          <ul>
            <li>black and queer</li>
            <li>
              eng enstars player as of <strong>june 2022</strong>
            </li>
          </ul>
        </section>
        <h1 style={{ margin: "1em 0em" }}>favorites</h1>
        <section className={styles.carrdSection}>
          <div className={styles.marquee}>
            <h3>NIKI!!!!!</h3>
            {[3725, 3283, 2182, 3132, 3507, 3082, 3527].map((id) => (
              <img
                src={`https://assets.enstars.link/assets/card_still_full1_${id}_normal.png`}
                alt="NIKI"
                key={id}
              />
            ))}
          </div>
          <p>
            <strong>other favorite characters</strong> rinne, mayoi, tomoya,
            kohaku, tetora
          </p>
          <p>
            <strong>favorite ships</strong> <em>rinniki</em>, hiiteto, kohaai
          </p>
          <p>
            <strong>NOTE!</strong> rinniki is my favorite ship in enstars and i
            monoship rinne with niki. however, i do very rarely dabble in other
            niki ships which include nikihime, kuroniki, yuzuniki, nazuniki, and
            natsuniki.
          </p>
        </section>
        <h1 style={{ margin: "1em 0em" }}>before you follow</h1>
        <section className={styles.carrdSection}>
          <ul>
            <li>
              i softblock to break mutuals <strong>very</strong> liberally, it's
              usually to curate my space and is almost never personal
            </li>
            <li>
              that being said, i'd appreciate if mutuals softblock to break the
              mutual
            </li>
            <li>
              i swear <strong>a lot</strong>
            </li>
            <li>
              notifs are on for followers only and even then twitter doesn't
              show me every notif. most functional website
            </li>
            <li>
              <strong>i do not offer coding help!!</strong> i don't have time
              unfortunately T__T
            </li>
          </ul>
        </section>
        <h1 style={{ margin: "1em 0em" }}>rules</h1>
        <section className={styles.carrdSection}>
          <ul>
            <li>
              <strong>
                do not interact if you think racism/colorism isn't a big deal,
                undermine/harass those who call out racism either in enstars or
                the fandom, or prioritize the feelings of fictional characters
                over real poc.
              </strong>{" "}
              i want nothing to do with you and nothing i make will ever be for
              you.
            </li>
            <li>
              i am uncomfortable with incest and loli/shotacons, i don't
              identify as an anti and i will never harass anyone over this, but
              i will exercise my right to block and move on
            </li>
            <li>
              i will block/mute you if you attack people for sharing their
              harmless opinions
            </li>
            <li>
              <strong>
                rinhime is a strong notp of mine and i do anything i can to
                avoid it.
              </strong>
            </li>
            <li>
              <strong>
                Involve me in discourse and it'll be the last thing you do.
              </strong>
            </li>
          </ul>
        </section>
      </main>
      <motion.div className={styles.sparkles}>
        {sparklePlacements.map((coord) => (
          <Sparkle key={`${coord.x}${coord.y}`} {...coord} />
        ))}
      </motion.div>
    </div>
  );
}
