<template>
  <div>
    <select v-model="firstCard">
      <option
        v-for="card in cards"
        :key="`first-card-${card.value}`"
        :value="card.value"
      >
        {{ card.name }}
      </option>
    </select>
    <select v-model="secondCard">
      <option
        v-for="card in cards"
        :key="`first-card-${card.value}`"
        :value="card.value"
      >
        {{ card.name }}
      </option>
    </select>
    <label>
      <input type="checkbox" />
      <span>Одномастные</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cards } from "@/helpers/lib";

const firstCard = ref(cards[0].value);
const secondCard = ref(cards[0].value);
</script>
