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

export enum ActionName {
  FOLD = "fold",
  CALL = "call",
  RAISE = "raise",
  PUSH = "push",
}

export interface PositionPower {
  position: Position;
  minHandPower: number;
}

export interface ActionPower {
  action: ActionName;
  minHandPower: number;
}

export interface Zone {
  name: ZoneName;
  isInTheZone: (mValue: number) => boolean;
  strategy: {
    positionPower?: PositionPower[];
    actionPower?: ActionPower[];
  };
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
