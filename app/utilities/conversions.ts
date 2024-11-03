/**
 *
 * @param cm the amount of centimeters
 * @returns the height in feet and inches
 */
export function cmToFeet(cm: number): string {
  const inches = cm / 2.54;
  const feet = Math.floor(inches / 12);
  const leftoverInches = Math.round(inches % 12);
  return `${feet}'${leftoverInches}"`;
}
