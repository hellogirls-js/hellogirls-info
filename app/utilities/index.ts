import dayjs from "dayjs";

/**
 * get a random index from a given array
 * @param array {T[]} the array to get an index from
 * @returns {number} a random index
 * */
export function getRandomIndexFromArray<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length);
}

/**
 *
 * @param array the array to shuffle
 * @returns a shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 *
 * @param url MakoTools url to grab data from, either en or jp character or unit data
 * @returns a promise that returns the specified data array
 */
export async function getData(url: string): Promise<any> {
  try {
    const data = await fetch(url);
    if (data) {
      const jsonData: any = await data.json();
      if (jsonData.length) {
        const compliantData = jsonData.filter(
          (data: any) => data.compliant === "TRUE",
        );
        return compliantData;
      }
    } else {
      return [];
    }
  } catch (error) {
    const e: Error = error as Error;
    console.error("could not retrieve data", e.message);
    return [];
  }
}

export function computeAge(birthday: string): number {
  return dayjs().diff(dayjs(birthday), "year");
}

export * from "@/utilities/conversions";
