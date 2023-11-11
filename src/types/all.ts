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
