import followerSurveyData from "@/data/follower_survey_data.min.json";

/**
 *
 * @returns an array of responses from the follower survey
 */
export function getSurveyResponses(): FollowerSurveyData[] {
  return followerSurveyData;
}

/**
 *
 * @param type the type of response to count votes for
 * @returns an array with counted votes for each character
 */
export function countVotes(type: FollowerSurveyDataType): CountedVotes[] {
  const responses = getSurveyResponses();

  const countedVotes: CountedVotes[] = [];

  for (let i = 0; i < responses.length; i++) {
    const resCharaId = parseInt(responses[i][type].split(": ")[0]);

    const existingIndex = countedVotes.findIndex(
      (chara) => chara.chara_id === resCharaId,
    );

    if (existingIndex > -1) {
      // if the index exists in the countedVotes array, add to the vote count
      countedVotes[existingIndex].count++;
    } else {
      // otherwise, create a new object and add it to countedVotes
      const newCharaCount: CountedVotes = {
        chara_id: resCharaId,
        count: 1,
      };

      countedVotes.push(newCharaCount);
    }
  }

  return countedVotes;
}
