import { type Settings, Position, ZoneName, ActionName } from "@/types/all";

export const settings: Settings = {
  zones: [
    {
      name: ZoneName.GREEN,
      isInTheZone: (mValue: number) => mValue >= 20,
      strategy: {
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
    },
    {
      name: ZoneName.YELLOW,
      isInTheZone: (mValue: number) => mValue >= 10 && mValue < 20,
      strategy: {
        positionPower: [
          {
            position: Position.UTG,
            minHandPower: 7.5,
          },
          {
            position: Position.MP,
            minHandPower: 6,
          },
          {
            position: Position.LP,
            minHandPower: 4.5,
          },
        ],
      },
    },
    {
      name: ZoneName.ORANGE,
      isInTheZone: (mValue: number) => mValue >= 6 && mValue < 10,
      strategy: {
        positionPower: [
          {
            position: Position.UTG,
            minHandPower: 7,
          },
          {
            position: Position.MP,
            minHandPower: 5.5,
          },
          {
            position: Position.LP,
            minHandPower: 4,
          },
        ],
      },
    },
    {
      name: ZoneName.RED,
      isInTheZone: (mValue: number) => mValue >= 1 && mValue < 6,
      strategy: {
        actionPower: [
          {
            action: ActionName.RAISE,
            minHandPower: 3,
          },
          {
            action: ActionName.CALL,
            minHandPower: 1,
          },
        ],
      },
    },
    {
      name: ZoneName.DEAD,
      isInTheZone: (mValue: number) => mValue < 1,
      strategy: {
        actionPower: [
          {
            action: ActionName.RAISE,
            minHandPower: 1,
          },
        ],
      },
    },
  ],
};
