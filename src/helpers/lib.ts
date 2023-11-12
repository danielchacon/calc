import { type Card, type Settings, Position, ZoneName } from "@/types/all";

export const cards: Card[] = [
  {
    name: "A",
    originalValue: 14,
    formulaValue: 10,
  },
  {
    name: "K",
    originalValue: 13,
    formulaValue: 8,
  },
  {
    name: "Q",
    originalValue: 12,
    formulaValue: 7,
  },
  {
    name: "J",
    originalValue: 11,
    formulaValue: 6,
  },
  {
    name: "T",
    originalValue: 10,
    formulaValue: 5,
  },
  {
    name: "9",
    originalValue: 9,
    formulaValue: 4.5,
  },
  {
    name: "8",
    originalValue: 8,
    formulaValue: 4,
  },
  {
    name: "7",
    originalValue: 7,
    formulaValue: 3.5,
  },
  {
    name: "6",
    originalValue: 6,
    formulaValue: 3,
  },
  {
    name: "5",
    originalValue: 5,
    formulaValue: 2.5,
  },
  {
    name: "4",
    originalValue: 4,
    formulaValue: 2,
  },
  {
    name: "3",
    originalValue: 3,
    formulaValue: 1.5,
  },
  {
    name: "2",
    originalValue: 2,
    formulaValue: 1,
  },
];

export const settings: Settings = {
  zones: [
    {
      name: ZoneName.GREEN,
      isInTheZone: (mValue: number) => mValue >= 20,
      positionPower: [
        {
          position: Position.UTG,
          minHandPower: 9,
        },
        {
          position: Position.MP,
          minHandPower: 7,
        },
        {
          position: Position.LP,
          minHandPower: 5,
        },
      ],
    },
    {
      name: ZoneName.YELLOW,
      isInTheZone: (mValue: number) => mValue >= 10 && mValue < 20,
      positionPower: [
        {
          position: Position.UTG,
          minHandPower: 8,
        },
        {
          position: Position.MP,
          minHandPower: 6,
        },
        {
          position: Position.LP,
          minHandPower: 4,
        },
      ],
    },
    {
      name: ZoneName.ORANGE,
      isInTheZone: (mValue: number) => mValue >= 6 && mValue < 10,
      positionPower: [
        {
          position: Position.UTG,
          minHandPower: 8,
        },
        {
          position: Position.MP,
          minHandPower: 6,
        },
        {
          position: Position.LP,
          minHandPower: 4,
        },
      ],
    },
    {
      name: ZoneName.RED,
      isInTheZone: (mValue: number) => mValue >= 1 && mValue < 6,
      positionPower: [
        {
          position: Position.UTG,
          minHandPower: 8,
        },
        {
          position: Position.MP,
          minHandPower: 6,
        },
        {
          position: Position.LP,
          minHandPower: 4,
        },
      ],
    },
    {
      name: ZoneName.DEAD,
      isInTheZone: (mValue: number) => mValue < 1,
      positionPower: [
        {
          position: Position.UTG,
          minHandPower: 8,
        },
        {
          position: Position.MP,
          minHandPower: 6,
        },
        {
          position: Position.LP,
          minHandPower: 4,
        },
      ],
    },
  ],
};
