import { type Card } from "@/types/all";

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
