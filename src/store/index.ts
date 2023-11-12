import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { cards, settings } from "@/helpers/lib";
import {
  type Card,
  type Hand,
  type Zone,
  type PositionPower,
  Position,
} from "@/types/all";
import { getPower } from "@/helpers/calc";

export const useAppStore = defineStore("app", () => {
  const firstCard = ref<Card>(cards[0]);
  const secondCard = ref<Card>(cards[0]);
  const isSuited = ref<boolean>(false);
  const stack = ref<number>(500);
  const bigBlind = ref<number>(50);
  const ante = ref<number>(0);
  const playersNumber = ref<number>(8);
  const allHands = ref<Hand[]>([]);
  const position = ref<Position>(Position.UTG);

  const mValue = computed<number>(() => {
    const result =
      stack.value /
      (bigBlind.value / 2 + bigBlind.value + ante.value * playersNumber.value);

    if (isNaN(result)) {
      return 0;
    }

    return Math.round(result);
  });

  const currentHandSorted = computed<Card[]>(() => {
    const hand = [firstCard.value, secondCard.value];

    hand.sort((a, b) => b.originalValue - a.originalValue);

    return hand;
  });

  const currentHandName = computed<string>(
    () =>
      `${currentHandSorted.value.map((card) => card.name).join("")}${
        firstCard.value.originalValue !== secondCard.value.originalValue &&
        isSuited.value
          ? "s"
          : ""
      }`
  );

  const currentHand = computed<Hand | undefined>(() =>
    allHands.value.find((hand) => hand.name === currentHandName.value)
  );

  const currentMZone = computed<Zone>(
    () =>
      settings.zones.find((zone) => zone.isInTheZone(mValue.value)) ||
      settings.zones[0]
  );

  const handToPositionPower = computed<Map<string, PositionPower>>(() => {
    const map = new Map();

    for (const hand of allHands.value) {
      map.set(
        hand.name,
        currentMZone.value.positionPower.find(
          (positionPowerItem) => hand.power >= positionPowerItem.minHandPower
        )
      );
    }

    return map;
  });

  const UPDATE_IS_SUITED = (payload: boolean) => {
    isSuited.value = payload;
  };

  const INIT_ALL_HANDS = (): void => {
    if (localStorage.allHands) {
      allHands.value = JSON.parse(localStorage.allHands);

      return;
    }

    for (const firstCard of cards) {
      for (const secondCard of cards) {
        if (secondCard.originalValue <= firstCard.originalValue) {
          const cards = [firstCard, secondCard];
          const nameBase = cards.map((item) => item.name).join("");

          if (firstCard.originalValue === secondCard.originalValue) {
            const hand: Hand = {
              name: nameBase,
              cards: cards,
              isSuited: false,
              power: getPower(firstCard, secondCard, false),
            };

            allHands.value.push(hand);
          } else {
            for (const isSuited of [false, true]) {
              const hand: Hand = {
                name: `${nameBase}${isSuited ? "s" : ""}`,
                cards: cards,
                isSuited,
                power: getPower(firstCard, secondCard, isSuited),
              };

              allHands.value.push(hand);
            }
          }
        }
      }
    }

    localStorage.setItem("allHands", JSON.stringify(allHands.value));
  };

  return {
    firstCard,
    secondCard,
    isSuited,
    currentHand,
    stack,
    bigBlind,
    ante,
    playersNumber,
    allHands,
    mValue,
    position,
    handToPositionPower,
    currentMZone,
    UPDATE_IS_SUITED,
    INIT_ALL_HANDS,
  };
});
