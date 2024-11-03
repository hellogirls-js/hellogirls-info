type Page = "home" | "game" | "instructions" | "result" | "error" | "loading";

type WordCategory =
  | "NOUN"
  | "VERB"
  | "ADJECTIVE"
  | "ENSTARSUNIT"
  | "BODYPART"
  | "NAME"
  | "MONTH"
  | "PRONOUN";

type WordModifier = "PASTTENSE" | "ING" | "PLURAL";

type PhraseCategory = "SONG" | "NAME";

interface Letter {
  letter: string;
  isGuessed: boolean;
}

interface Coord {
  x: number;
  y: number;
}

interface Shuriken {
  visible: boolean;
  coordinates: Coord;
}

type CardActionKind = "smash" | "pass" | "reset" | "proceed";

interface CardAction {
  type: CardActionKind;
  payload?: number;
}

interface CardState {
  index: number;
  smashList: number[];
  passList: number[];
  matchList: number[];
  direction: 1 | -1 | 0;
  choice: number;
}
