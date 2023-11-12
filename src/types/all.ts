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

export interface PositionPower {
  position: Position;
  minHandPower: number;
}

export interface Zone {
  name: ZoneName;
  isInTheZone: (mValue: number) => boolean;
  positionPower?: PositionPower[];
}

export interface Settings {
  zones: Zone[];
}

export enum ZoneName {
  GREEN = "green",
  YELLOW = "yellow",
  ORANGE = "orange",
  RED = "red",
  DEAD = "dead",
}
