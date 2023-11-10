import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { cards } from "@/helpers/lib";
import { type Card } from "@/types/all";

export const useAppStore = defineStore("app", () => {
  const firstCard = ref<Card>(cards[0]);
  const secondCard = ref<Card>(cards[0]);
  const isSuited = ref<boolean>(false);
  const stack = ref<number>(500);
  const bigBlind = ref<number>(50);
  const ante = ref<number>(0);
  const playersNumber = ref<number>(8);

  function getPower(firstCard: Card, secondCard: Card, suited: boolean) {
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
      const gap = maxCard.value - minCard.value - 1;

      if (gap <= 2) {
        resultPower -= gap;
      } else if (gap === 3) {
        resultPower -= 4;
      } else if (gap >= 4) {
        resultPower -= 5;
      }

      if (gap <= 1 && maxCard.value <= 11) {
        resultPower += 1;
      }

      if (suited) {
        resultPower += 2;
      }

      power = resultPower;
    }

    return power;
  }

  const mValue = computed(() => {
    const result =
      stack.value /
      (bigBlind.value / 2 + bigBlind.value + ante.value * playersNumber.value);

    if (isNaN(result)) {
      return 0;
    }

    return Math.round(result);
  });

  const handPower = computed<number>(() =>
    getPower(firstCard.value, secondCard.value, isSuited.value)
  );

  const UPDATE_IS_SUITED = (payload: boolean) => {
    isSuited.value = payload;
  };

  return {
    firstCard,
    secondCard,
    isSuited,
    handPower,
    stack,
    bigBlind,
    ante,
    playersNumber,
    mValue,
    UPDATE_IS_SUITED,
  };
});
