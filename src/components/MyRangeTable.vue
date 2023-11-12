<template>
  <section class="my-range-table p-2">
    <div class="container">
      <table
        class="table is-fullwidth is-bordered is-narrow is-hoverable my-range-table__table"
      >
        <thead>
          <tr>
            <th></th>
            <th
              v-for="card in cards"
              :key="`range-th-${card.name}`"
              class="has-text-centered"
            >
              {{ card.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="firstCard in cards" :key="`range-tr-${firstCard.name}`">
            <th class="has-text-centered">{{ firstCard.name }}</th>
            <td
              v-for="hand in tableReadyHands?.[firstCard.name]"
              :key="`range-td-${hand.name}`"
              :class="['has-text-centered', hand.positionClass]"
            >
              <div class="has-text-weight-bold">{{ hand.name }}</div>
              <div>{{ hand.power }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cards } from "@/helpers/lib";
import { getPositionClassName } from "@/helpers/calc";
import { useAppStore } from "@/store";
import { computed } from "vue";
import { Position, type Hand } from "@/types/all";

const store = useAppStore();

interface TableHand extends Hand {
  positionClass: string;
}

const tableReadyHands = computed(() => {
  const hands: Record<string, TableHand[]> = {};

  for (const firstCard of cards) {
    for (const secondCard of cards) {
      const hand: Hand | undefined = store.allHands.find((hand) => {
        return secondCard.name === firstCard.name
          ? hand.cards.every((card) => card.name === firstCard.name)
          : hand.isSuited ===
              secondCard.originalValue < firstCard.originalValue &&
              hand.cards.some((card) => card.name === firstCard.name) &&
              hand.cards.some((card) => card.name === secondCard.name);
      });

      if (!hand || !hand.name) return;

      const handToPositionPower = store.handToPositionPower.get(hand.name);

      const tableHand: TableHand = {
        ...hand,
        positionClass: handToPositionPower
          ? `${
              [Position.UTG, Position.MP].some(
                (item) => item === handToPositionPower.position
              )
                ? "has-text-white"
                : ""
            } ${getPositionClassName(handToPositionPower.position)}`
          : "",
      };

      if (hands[firstCard.name]) {
        hands[firstCard.name].push(tableHand);
      } else {
        hands[firstCard.name] = [tableHand];
      }
    }
  }

  return hands;
});
</script>

<style lang="scss">
.my-range-table {
  .table {
    font-size: 2vw;

    th,
    td {
      vertical-align: middle;
    }
  }
}
</style>
