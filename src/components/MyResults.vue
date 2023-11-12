<template>
  <section class="p-2">
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Сила руки</th>
            <th>Число М</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :class="['is-size-4', 'has-text-centered', additionalClass]">
              {{ store.currentHand?.power }}
            </td>
            <td :class="['is-size-4', 'has-text-centered', mValueClass]">
              {{ store.mValue }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/index";
import {
  getPositionClassName,
  getZoneClassName,
  getActionClassName,
} from "@/helpers/calc";
import { computed } from "vue";

const store = useAppStore();

const additionalClass = computed<string>(() => {
  if (!store.currentHand) return "";

  if (store.currentMZone.strategy.positionPower) {
    const handToPositionPower = store.handToPositionPower.get(
      store.currentHand.name
    );

    if (handToPositionPower) {
      return getPositionClassName(handToPositionPower.position);
    }
  } else if (store.currentMZone.strategy.actionPower) {
    const handToActionPower = store.handToActionPower.get(
      store.currentHand.name
    );

    if (handToActionPower) {
      return getActionClassName(handToActionPower.action);
    }
  }

  const handToPositionPower = store.handToPositionPower.get(
    store.currentHand.name
  );

  return handToPositionPower
    ? getPositionClassName(handToPositionPower.position)
    : "";
});

const mValueClass = computed<string>(() => {
  const currentZone = store.currentMZone;

  return getZoneClassName(currentZone.name);
});
</script>
