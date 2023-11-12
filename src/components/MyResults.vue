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
            <td :class="['is-size-4', 'has-text-centered', powerResultClass]">
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
import { getPositionClassName, getZoneClassName } from "@/helpers/calc";
import { computed } from "vue";

const store = useAppStore();

const powerResultClass = computed<string>(() => {
  if (!store.currentHand) return "";

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
