<template>
  <section class="p-2">
    <div class="container">
      <div class="box">
        <div class="is-flex is-align-items-center mb-2">
          <div class="select is-medium mr-4">
            <select v-model="store.firstCard">
              <option
                v-for="card in cards"
                :key="`first-card-${card.name}`"
                :value="card"
              >
                {{ card.name }}
              </option>
            </select>
          </div>
          <div class="select is-medium mr-4">
            <select v-model="store.secondCard">
              <option
                v-for="card in cards"
                :key="`second-card-${card.name}`"
                :value="card"
              >
                {{ card.name }}
              </option>
            </select>
          </div>
          <button
            :class="['button', 'is-primary', { 'is-light': !store.isSuited }]"
            type="button"
            @click="onSuitedButtonClick"
          >
            Одномастные
          </button>
        </div>
        <div class="columns is-mobile is-variable is-1">
          <div class="column">
            <div class="field">
              <label class="label">Стек</label>
              <div class="control">
                <input
                  v-model="store.stack"
                  class="input"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">ББ</label>
              <div class="control">
                <input
                  v-model="store.bigBlind"
                  class="input"
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Анте</label>
              <div class="control">
                <input
                  v-model="store.ante"
                  class="input"
                  type="number"
                  min="0"
                />
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
                  max="10"
                />
              </div>
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
