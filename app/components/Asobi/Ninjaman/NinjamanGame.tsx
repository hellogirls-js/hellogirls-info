import { Suspense, useEffect, useReducer } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";

import styles from "@/styles/Ninjaman.module.scss";

import { ASOBI_SHINOBU_HIT, ASOBI_SHINOBU_IDLE, ASOBI_SHINOBU_LOSE, ASOBI_SHINOBU_MISS, ASOBI_SHINOBU_SHURIKEN, ASOBI_SHINOBU_TARGET, ASOBI_SHINOBU_WIN, KEYBOARD_ARR, hitShurikens, missShurikens } from "@/utilities/ninjaman";

interface State {
  playGame: boolean;
  wonGame: boolean;
  shinobuSprite: string;
  isShinobuIdle: boolean;
  missAmt: number;
  guessedLetters: string[];
  letterKeys: Letter[][];
  hitShurikens: Shuriken[];
  missShurikens: Shuriken[];
}

const tempKeys = KEYBOARD_ARR;
const tempHits = hitShurikens;
const tempMisses = missShurikens;

const defaultState: State = {
  playGame: true,
  wonGame: false,
  shinobuSprite: ASOBI_SHINOBU_IDLE,
  isShinobuIdle: true,
  missAmt: 0,
  guessedLetters: [],
  letterKeys: tempKeys,
  hitShurikens: tempHits,
  missShurikens: tempMisses,
};

type Action =
  | {
      type: "chooseLetter";
      payload: {
        letterKey: Letter;
        isPresent: boolean;
      };
    }
  | {
      type: "resetToIdle";
    }
  | {
      type: "loseState";
    }
  | {
      type: "winState";
      payload: {
        letterKey: Letter;
      };
    }
  | { type: "fetchData" }
  | { type: "newGame" };


/**
 *
 * @returns the actual game content
 */
export default function NinjamanGame({data, revalidator}: {data: {type: string; phrase: string}; revalidator: {revalidate: () => void; state: "idle" | "loading"}}) {
  const isMobile = useMediaQuery("(max-width: 812px)");

  console.log("data", data);

  function reducer(state: State, action: Action): State {
    // state changes: shinobu sprite transition, show shuriken
    let newGuessedLetters: string[];
    let newHitShurikens: Shuriken[];
    let newMissShurikens: Shuriken[];
    let newKeys: Letter[][];
    let currentKey: Letter;
    switch (action.type) {
      case "chooseLetter":
        newHitShurikens = state.hitShurikens;
        newMissShurikens = state.missShurikens;
        newGuessedLetters = state.guessedLetters;
        newKeys = state.letterKeys;
        currentKey = {...newKeys
          .flat()
          .filter((key) => key === action.payload.letterKey)[0], isGuessed: true};
        for (let i = 0; i < newKeys.length; i++) {
          for (let j = 0; j < newKeys[i].length; j++) {
            if (newKeys[i][j].letter === currentKey.letter) {
              newKeys[i][j] = currentKey;
            }
          }
        }
        return {
          ...state,
          missAmt: newMissShurikens.filter(
          (sh) => sh.visible === true
        ).length,
          guessedLetters: newGuessedLetters,
          letterKeys: newKeys,
          shinobuSprite: action.payload.isPresent
            ? ASOBI_SHINOBU_HIT : ASOBI_SHINOBU_MISS,
          isShinobuIdle: false,
          hitShurikens: newHitShurikens,
          missShurikens: newMissShurikens,
        };
      case "resetToIdle":
        return {
          ...state,
          shinobuSprite: ASOBI_SHINOBU_IDLE,
          isShinobuIdle: true,
        };
      case "winState":
        newHitShurikens = state.hitShurikens;
        newGuessedLetters = [
          ...state.guessedLetters,
          action.payload.letterKey.letter,
        ];
        newHitShurikens[newHitShurikens.length - 1] = {
          ...newHitShurikens[newHitShurikens.length - 1],
          visible: true,
        };
        return {
          ...state,
          playGame: false,
          wonGame: true,
          shinobuSprite: ASOBI_SHINOBU_WIN,
          isShinobuIdle: false,
          hitShurikens: newHitShurikens,
          guessedLetters: newGuessedLetters,
        };
      case "loseState":
        newGuessedLetters = state.guessedLetters;
        newMissShurikens = state.missShurikens;
        newMissShurikens[newMissShurikens.length - 1] = {
          ...state.missShurikens[state.missShurikens.length - 1],
          visible: true,
        };

        KEYBOARD_ARR.flat().forEach((key) => {
          if (!newGuessedLetters.includes(key.letter)) {
            newGuessedLetters.push(key.letter);
          }
        });
        return {
          ...state,
          playGame: false,
          shinobuSprite: ASOBI_SHINOBU_LOSE,
          isShinobuIdle: false,
          guessedLetters: newGuessedLetters,
          missShurikens: newMissShurikens,
        };
      case "fetchData":
        revalidator.revalidate();
        return {
          ...state,
          playGame: true,
          wonGame: false,
          shinobuSprite: ASOBI_SHINOBU_IDLE,
          isShinobuIdle: true,
          missAmt: 0,
          guessedLetters: [],
          letterKeys: [
            [
              { letter: "Q", isGuessed: false },
              { letter: "W", isGuessed: false },
              { letter: "E", isGuessed: false },
              { letter: "R", isGuessed: false },
              { letter: "T", isGuessed: false },
              { letter: "Y", isGuessed: false },
              { letter: "U", isGuessed: false },
              { letter: "I", isGuessed: false },
              { letter: "O", isGuessed: false },
              { letter: "P", isGuessed: false },
            ],
            [
              { letter: "A", isGuessed: false },
              { letter: "S", isGuessed: false },
              { letter: "D", isGuessed: false },
              { letter: "F", isGuessed: false },
              { letter: "G", isGuessed: false },
              { letter: "H", isGuessed: false },
              { letter: "J", isGuessed: false },
              { letter: "K", isGuessed: false },
              { letter: "L", isGuessed: false },
            ],
            [
              { letter: "Z", isGuessed: false },
              { letter: "X", isGuessed: false },
              { letter: "C", isGuessed: false },
              { letter: "V", isGuessed: false },
              { letter: "B", isGuessed: false },
              { letter: "N", isGuessed: false },
              { letter: "M", isGuessed: false },
            ],
          ],
          hitShurikens: [
            {
              visible: false,
              coordinates: {
                x: 20,
                y: 10,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 120,
                y: 95,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 30,
                y: 100,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 100,
                y: 6,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 98,
                y: 67,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 5,
                y: 67,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 70,
                y: 120,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 72,
                y: 20,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 40,
                y: 40,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 100,
                y: 42,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 50,
                y: 80,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 72,
                y: 56,
              },
            },
          ],
          missShurikens: [
            {
              visible: false,
              coordinates: {
                x: -30,
                y: 32,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 55,
                y: 142,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 120,
                y: -5,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 140,
                y: 80,
              },
            },
            {
              visible: false,
              coordinates: {
                x: -20,
                y: 72,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 30,
                y: -20,
              },
            },
            {
              visible: false,
              coordinates: {
                x: -10,
                y: 100,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 130,
                y: 120,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 143,
                y: 40,
              },
            },
            {
              visible: false,
              coordinates: {
                x: 90,
                y: -30,
              },
            },
            {
              visible: false,
              coordinates: {
                x: -10,
                y: -30,
              },
            },
            {
              visible: false,
              coordinates: {
                x: -20,
                y: 120,
              },
            },
          ],
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const MISS_COUNT = 7;

  useEffect(() => {
    if (
      !state.isShinobuIdle &&
      (state.shinobuSprite === ASOBI_SHINOBU_HIT ||
        state.shinobuSprite === ASOBI_SHINOBU_MISS)
    ) {
      setTimeout(() => {
        dispatch({ type: "resetToIdle" });
      }, 2000);
    }
    if (state.missAmt >= MISS_COUNT) {
      dispatch({
        type: "loseState",
      });
    }
  }, [state.shinobuSprite, state.missAmt]);

  function NinjamanShinobuBoard() {
    const divide = isMobile ? 1.65 : 1;

    return (
      <div className={styles.ninjamanShinobuBoard}>
        <div className={styles.ninjamanBoardTarget}>
          {state.hitShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x / divide,
                top: shuriken.coordinates.y / divide,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <img
                src={ASOBI_SHINOBU_SHURIKEN}
                alt="shuriken"
              />
            </div>
          ))}
          {state.missShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x / divide,
                top: shuriken.coordinates.y / divide,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <img
                src={ASOBI_SHINOBU_SHURIKEN}
                alt="shuriken"
              />
            </div>
          ))}
          <div className={styles.ninjamanTarget}>
            <img
              src={ASOBI_SHINOBU_TARGET}
              alt="target"
            />
          </div>
        </div>
        <div
          className={`${styles.ninjamanBoardShnoob} ${
            state.isShinobuIdle && styles.idle
          }`}
        >
          <div
            className={styles.ninjamanShnoobPhrase}
            style={{
              display: state.isShinobuIdle ? "none" : "block",
            }}
          >
            {state.shinobuSprite === ASOBI_SHINOBU_HIT
              ? "Wow, de gozaru!"
              : state.shinobuSprite === ASOBI_SHINOBU_WIN
              ? "We did it, de gozaru!!"
              : state.shinobuSprite === ASOBI_SHINOBU_LOSE
              ? "Aw man, de gozaru..."
              : "Not quite, de gozaru..."}
          </div>
          <img
            src={state.shinobuSprite}
            alt="shinobu"
          />
        </div>
      </div>
    );
  }

  function NinjamanPhraseLetter({ letter }: { letter: string }) {
    if (letter === " ") {
      return (
        <div
          className={`${styles.ninjamanLetter} ${styles.ninjamanLetterBlank}`}
        ></div>
      );
    } else {
      if (state.guessedLetters.includes(letter)) {
        return (
          <div
            className={`${styles.ninjamanLetter} ${styles.ninjamanLetterText}`}
          >
            {letter}
          </div>
        );
      } else {
        return (
          <div
            className={`${styles.ninjamanLetter} ${styles.ninjamanLetterBlock}`}
          ></div>
        );
      }
    }
  }

  function NinjamanKeyboard() {
    return (
      <div className={styles.ninjamanKeyboard}>
        {state.letterKeys.map((row, index) => (
          <div key={index} className={styles.ninjamanKeyboardRow}>
            {row.map((keyObj) => (
              <input
                type="button"
                value={keyObj.letter}
                key={keyObj.letter}
                className={`${styles.ninjamanKeyboardKey} ${
                  keyObj.isGuessed ? styles.guessed : styles.notGuessed
                }`}
                disabled={
                  keyObj.isGuessed || !state.isShinobuIdle || !state.playGame
                }
                onClick={(e) => {
                  // check if all letters are guessed
                  const uniquePhraseLetters = Array.from(data.phrase).filter(
                    (letter, index: number, arr) =>
                      arr.indexOf(letter) === index && letter !== " "
                  );
                  let guessedLettersAmt = 0;
                  const tempGuessedLetters = [
                    ...state.guessedLetters,
                    (e.target as HTMLInputElement).value,
                  ];
                  for (let i = 0; i < uniquePhraseLetters.length; i++) {
                    if (
                      tempGuessedLetters.includes(
                        (uniquePhraseLetters as string[])[i]
                      )
                    ) {
                      guessedLettersAmt++;
                    }
                  }
                  if (state.missAmt < MISS_COUNT) {
                    if (guessedLettersAmt >= uniquePhraseLetters.length) {
                      dispatch({
                        type: "winState",
                        payload: {
                          letterKey: keyObj,
                        },
                      });
                    } else {
                      dispatch({
                        type: "chooseLetter",
                        payload: {
                          letterKey: keyObj,
                          isPresent: data.phrase.includes(keyObj.letter),
                        },
                      });
                    }
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.ninjamanPage} ${styles.ninjamanGame}`}>
    {data && <div className={styles.ninjamanGameContainer}>
          <NinjamanShinobuBoard />
          <div className={styles.ninjamanGameNotShnoob}>
            <div className={styles.ninjamanCategoryAndButton}>
              <div className={styles.ninjamanGameCategory}>
                <span className={styles.categoryLabel}>Category:</span>{" "}
                {data.type}
              </div>
              <button
                className={styles.ninjamanReplayButton}
                style={{ display: state.playGame ? "none" : "block" }}
                onClick={() => {
                  dispatch({ type: "fetchData" });
                }}
              >
                <IconRefresh /> New game
              </button>
            </div>
            <div className={styles.ninjamanGameLetters}>
              {data.phrase.split(" ").map((phrase: string, index: number) => {
                return (
                  <div className={styles.ninjamanPhraseGroup} key={index}>
                    {Array.from(phrase).map((letter: string, index: number) => {
                      return (
                        <NinjamanPhraseLetter key={index} letter={letter} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <NinjamanKeyboard />
          </div>
        </div>}
    </div>
  );
}
