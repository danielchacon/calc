export interface Card {
  name: string;
  originalValue: number;
  formulaValue: number;
}

export interface Hand {
  name: string;
  cards: Card[];
  isSuited: boolean;
  power: number;
}

export enum Position {
  UTG = "UTG",
  MP = "MP",
  LP = "LP",
}

export interface Range {
  min: number;
  max: number;
  class: string;
  position: Position;
}
