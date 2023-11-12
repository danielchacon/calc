import { type Card, Position, ZoneName } from "@/types/all";

export const getPower = (
  firstCard: Card,
  secondCard: Card,
  isSuited: boolean
) => {
  if (!firstCard || !secondCard) {
    return 0;
  }

  let power = 0;
  let maxCard = null;
  let minCard = null;

  if (firstCard.formulaValue > secondCard.formulaValue) {
    maxCard = firstCard;
    minCard = secondCard;
  } else {
    maxCard = secondCard;
    minCard = firstCard;
  }

  const isPair = firstCard.name === secondCard.name;

  if (isPair) {
    const multiplied = maxCard.formulaValue * 2;

    if (multiplied < 5) {
      power = 5;
    } else {
      power = multiplied;
    }
  } else {
    let resultPower = maxCard.formulaValue;
    const gap = maxCard.originalValue - minCard.originalValue - 1;

    if (gap <= 2) {
      resultPower -= gap;
    } else if (gap === 3) {
      resultPower -= 4;
    } else if (gap >= 4) {
      resultPower -= 5;
    }

    if (gap <= 1 && maxCard.originalValue <= 11) {
      resultPower += 1;
    }

    if (isSuited) {
      resultPower += 2;
    }

    power = resultPower;
  }

  return power;
};

export const getPositionClassName = (position: Position): string => {
  if (position === Position.UTG) {
    return "has-text-white has-background-link";
  } else if (position === Position.MP) {
    return "has-text-white has-background-success";
  } else if (position === Position.LP) {
    return "has-background-warning";
  }

  return "";
};

export const getZoneClassName = (zoneName: ZoneName): string => {
  if (zoneName === ZoneName.GREEN) {
    return "has-text-white has-background-success";
  } else if (zoneName === ZoneName.YELLOW) {
    return " has-background-warning";
  } else if (zoneName === ZoneName.ORANGE) {
    return "has-text-white has-background-warning-dark";
  } else if (zoneName === ZoneName.RED) {
    return "has-text-white has-background-danger-dark";
  } else if (zoneName === ZoneName.DEAD) {
    return "has-background-grey-light";
  }

  return "";
};
