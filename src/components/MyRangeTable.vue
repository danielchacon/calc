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
              :class="[
                'has-text-centered',
                store.handsToRange.get(hand.name)?.class,
              ]"
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
import { useAppStore } from "@/store";
import { computed } from "vue";
import { type Hand } from "@/types/all";

const store = useAppStore();

const tableReadyHands = computed(() => {
  const hands: Record<string, Hand[]> = {};

  for (const firstCard of cards) {
    for (const secondCard of cards) {
      const hand = store.allHands.find((hand) => {
        return secondCard.name === firstCard.name
          ? hand.cards.every((card) => card.name === firstCard.name)
          : hand.isSuited ===
              secondCard.originalValue < firstCard.originalValue &&
              hand.cards.some((card) => card.name === firstCard.name) &&
              hand.cards.some((card) => card.name === secondCard.name);
      });

      if (!hand) return;

      if (hands[firstCard.name]) {
        hands[firstCard.name].push(hand);
      } else {
        hands[firstCard.name] = [hand];
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
