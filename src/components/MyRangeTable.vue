<template>
  <section class="my-range-table p-2">
    <div class="container">
      <div class="is-flex is-justify-content-space-between">
        <div v-if="store.currentMZone.strategy.positionPower" class="tags mb-2">
          <span class="tag is-link">UTG</span>
          <span class="tag is-success">MP</span>
          <span class="tag is-warning">LP</span>
        </div>
        <div v-else class="tags mb-2">
          <span class="tag is-link">PUSH</span>
          <span class="tag is-success">CALL</span>
        </div>
        <div
          v-if="store.currentMZone.strategy.positionPower"
          class="has-text-weight-semibold"
        >
          {{ actionList.map((item) => item).join(" / ") }}
        </div>
      </div>

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
              :class="['has-text-centered', hand.additionalClass]"
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
import { getPositionClassName, getActionClassName } from "@/helpers/calc";
import { useAppStore } from "@/store";
import { computed } from "vue";
import { type Hand, ActionName, ZoneName } from "@/types/all";

const store = useAppStore();

interface TableHand extends Hand {
  additionalClass: string;
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

      let additionalClass = "";

      if (store.currentMZone.strategy.positionPower) {
        const handToPositionPower = store.handToPositionPower.get(hand.name);

        if (handToPositionPower) {
          additionalClass = getPositionClassName(handToPositionPower.position);
        }
      } else if (store.currentMZone.strategy.actionPower) {
        const handToActionPower = store.handToActionPower.get(hand.name);

        if (handToActionPower) {
          additionalClass = getActionClassName(handToActionPower.action);
        }
      }

      const tableHand: TableHand = {
        ...hand,
        additionalClass,
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

const actionList = computed<string[]>(() => {
  let list: string[] = [];
  const currentZone = store.currentMZone;

  if (currentZone.name === ZoneName.GREEN) {
    list = [ActionName.CALL, ActionName.RAISE, ActionName.THREE_BET];
  } else if (currentZone.name === ZoneName.YELLOW) {
    list = [ActionName.CALL, ActionName.RAISE];
  } else if (currentZone.name === ZoneName.ORANGE) {
    list = [ActionName.RAISE, ActionName.PUSH];
  } else if (currentZone.name === ZoneName.RED) {
    list = [ActionName.CALL, ActionName.PUSH];
  } else if (currentZone.name === ZoneName.DEAD) {
    list = [ActionName.PUSH];
  }

  return list;
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
