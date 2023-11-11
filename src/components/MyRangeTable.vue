<template>
  <section class="p-2">
    <div class="container">
      <table class="table is-fullwidth is-bordered is-size-7">
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
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cards } from "@/helpers/lib";
import { useAppStore } from "@/store";

const store = useAppStore();

// TODO: settings
const minPower = 5;
</script>
