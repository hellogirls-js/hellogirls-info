import { useClickOutside } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "@/styles/Bumble.module.scss";
import { Link } from "@remix-run/react";

export default function GameFooter() {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useClickOutside(() => setOpenModal(false));

  return (
    <footer>
      <AnimatePresence>
        {openModal && (
          <motion.div
            className={styles.keitoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.25 } }}
          >
            <div className={styles.keitoModalBg}>
              <motion.div
                className={styles.keitoModalContainer}
                ref={modalRef}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3, delay: 0.25 },
                }}
                exit={{
                  scale: 0,
                }}
              >
                <p>
                  Does this website look familiar? This was originally an April
                  Fool&apos;s project! Keito fans loved it, so I preserved it
                  for them.{" "}
                  <Link
                    to="https://dating.hellogirls.info"
                    rel="noreferrer"
                    target="_blank"
                  >
                    You can check it out here!
                  </Link>
                </p>
                <p>
                  While we&apos;re here, all assets are from{" "}
                  <Link
                    to="https://stars.ensemble.moe"
                    rel="noreferrer"
                    target="_blank"
                  >
                    MakoTools
                  </Link>{" "}
                  and character messages are from the{" "}
                  <Link
                    to="https://ensemble-stars.fandom.com/wiki/The_English_Ensemble_Stars_Wiki"
                    rel="noreferrer"
                    target="_blank"
                  >
                    English Enstars Wiki
                  </Link>
                  . Basic character data will be updated live as MakoTools
                  updates.
                </p>
                <p>
                  <Link to="/asobi" rel="noreferrer" target="_blank">
                    Check out more ASOBI! projects here!
                  </Link>{" "}
                  I&apos;m excited to complete the collection soon.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={styles.gameFooterButton}
        onClick={() => setOpenModal(true)}
      >
        <img
          src={`https://assets.enstars.link/assets/character_sd_square1_21.png`}
          alt={"link to keito hasumi april fools site"}
          width={75}
          height={75}
        />
      </button>
    </footer>
  );
}
