<template>
  <section class="p-2">
    <div class="container">
      <div>Действия: {{ actionList.map((item) => item).join(", ") }}</div>
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
import { ActionName, ZoneName } from "@/types/all";

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
