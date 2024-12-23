import { Suspense, useEffect, useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

import styles from "@/styles/Anzunator.module.scss";
import characters from "@/data/anzunator_characters.json";
import { questions } from "@/utilities/anzunator";
import { ANZU_EXCITED, ANZU_OH, ANZU_THINKING } from "@/utilities/anzunator";

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Quiz({
  setImage,
  setCharaMatch,
  setFoundMatch,
}: {
  setImage: any;
  setCharaMatch: any;
  setFoundMatch: any;
}) {
  const [questionCount, setQuestionCount] = useState(1);
  const [charaList, setCharacters] = useState<Character[]>(characters);
  const [qList, setQuestions] = useState<Question[]>(shuffle(questions));
  const [qIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    // set anzu expression
    if (charaList.length > 25) {
      setImage(ANZU_THINKING);
    } else if (charaList.length <= 25 && charaList.length > 5) {
      setImage(ANZU_OH);
    } else {
      setImage(ANZU_EXCITED);
    }

    let hairColorArr = charaList.map((c) => c.hair_color);
    let filteredHairArr = qList.filter(
      (q) => q.attribute === "hair_color" && hairColorArr.includes(q.value),
    );
    let eyeColorArr = charaList.map((c) => c.eye_color);
    let filteredEyeArr = qList.filter(
      (q) => q.attribute === "eye_color" && eyeColorArr.includes(q.value),
    );
    let agencyArr = charaList.map((c) => c.agency);
    let filteredAgencyArr = qList.filter(
      (q) => q.attribute === "agency" && agencyArr.includes(q.value),
    );
    let schoolArr = charaList.map((c) => c.school);
    let filteredSchoolArr = qList.filter(
      (q) => q.attribute === "school" && schoolArr.includes(q.value),
    );
    let circleArr = charaList.map((c) => c.circle);
    let filteredCircleArr = qList.filter((q) => {
      let contains = false;
      circleArr.forEach((c) => {
        if (c.includes(q.value)) {
          contains = true;
        }
      });
      return q.attribute === "circle" && contains;
    });
    let longHairArr = charaList.map((c) => c.long_hair);
    let filteredLongHair = qList.filter(
      (q) => q.attribute === "long_hair" && longHairArr.includes(q.value),
    );
    let glassesArr = charaList.map((c) => c.glasses);
    let filteredGlasses = qList.filter(
      (q) => q.attribute === "glasses" && glassesArr.includes(q.value),
    );
    let beautyMarkArr = charaList.map((c) => c.beauty_mark);
    let filteredBeautyMark = qList.filter(
      (q) => q.attribute === "beauty_mark" && beautyMarkArr.includes(q.value),
    );
    let multiHairArr = charaList.map((c) => c.multi_hair);
    let filteredMultiHair = qList.filter(
      (q) => q.attribute === "multi_hair" && multiHairArr.includes(q.value),
    );
    let multiEyeArr = charaList.map((c) => c.multi_eye);
    let filteredMultiEye = qList.filter(
      (q) => q.attribute === "multi_eye" && multiEyeArr.includes(q.value),
    );
    let heightArr = charaList.map((c) => c.height);
    let filteredHeightQuestions = qList.filter((q) => {
      let contains = false;
      if (q.attribute === "height") {
        q.value.forEach((v: number) => {
          if (heightArr.includes(v)) {
            contains = true;
          }
        });
      }
      return q.attribute === "height" && contains;
    });
    let birthdayArr = charaList.map((c) => c.birthday.split("-")[1]);
    let filteredBdayQuestions = qList.filter(
      (q) => q.attribute === "birthday" && birthdayArr.includes(q.value),
    );

    let newQuestionArr = [
      ...filteredHairArr,
      ...filteredEyeArr,
      ...filteredAgencyArr,
      ...filteredSchoolArr,
      ...filteredCircleArr,
      ...filteredLongHair,
      ...filteredGlasses,
      ...filteredBeautyMark,
      ...filteredMultiHair,
      ...filteredMultiEye,
      ...filteredHeightQuestions,
      ...filteredBdayQuestions,
    ];

    // filter out questions that are no longer relevant
    setQuestions(shuffle(newQuestionArr));

    if (charaList.length <= 1) {
      if (charaList.length === 1) setCharaMatch(charaList[0]);
      setFoundMatch(true);
    }
  }, [charaList]);

  return (
    <div className={styles.content}>
      <div className={styles.contentTitle}>
        <h1>
          <Suspense fallback={<>Loading...</>}>
            {questionCount}. {qList[qIndex].question}
          </Suspense>
        </h1>
      </div>
      <div className={styles.contentText}>
        <div className={styles.answerContainer}>
          <div
            className={`${styles.answer} ${styles.yes}`}
            onClick={(e) => {
              e.preventDefault();
              qList[qIndex].yesEffect(
                qList,
                setQuestions,
                charaList,
                setCharacters,
              );
              setQuestionCount(questionCount + 1);
            }}
          >
            <IconCheck strokeWidth={5} /> Yes
          </div>
          <div
            className={`${styles.answer} ${styles.no}`}
            onClick={(e) => {
              e.preventDefault();
              qList[qIndex].noEffect(
                qList,
                setQuestions,
                charaList,
                setCharacters,
              );
              setQuestionCount(questionCount + 1);
            }}
          >
            <IconX strokeWidth={5} /> No
          </div>
        </div>
      </div>
    </div>
  );
}
