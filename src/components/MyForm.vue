<template>
  <section class="section">
    <div class="container">
      <div class="is-flex is-align-items-center mb-4">
        <select class="select is-large mr-4" v-model="store.firstCard">
          <option
            v-for="card in cards"
            :key="`first-card-${card.name}`"
            :value="card"
          >
            {{ card.name }}
          </option>
        </select>
        <select class="select is-large mr-4" v-model="store.secondCard">
          <option
            v-for="card in cards"
            :key="`second-card-${card.name}`"
            :value="card"
          >
            {{ card.name }}
          </option>
        </select>
        <button
          :class="['button', 'is-primary', { 'is-light': !store.isSuited }]"
          type="button"
          @click="onSuitedButtonClick"
        >
          Одномастные
        </button>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <div class="field">
            <label class="label">Стек</label>
            <div class="control">
              <input v-model="store.stack" class="input" type="number" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">ББ</label>
            <div class="control">
              <input v-model="store.bigBlind" class="input" type="number" />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <div class="field">
            <label class="label">Анте</label>
            <div class="control">
              <input v-model="store.ante" class="input" type="number" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Игроков</label>
            <div class="control">
              <input
                v-model="store.playersNumber"
                class="input"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cards } from "@/helpers/lib";
import { useAppStore } from "@/store/index";

const store = useAppStore();

const onSuitedButtonClick = () => {
  store.UPDATE_IS_SUITED(!store.isSuited);
};
</script>

<style lang="scss"></style>
