<template>
  <section class="my-form p-2">
    <div class="container">
      <div class="box">
        <div class="is-flex is-align-items-center mb-2">
          <div class="select is-medium mr-2">
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
          <div class="select is-medium mr-2">
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
            v-show="store.firstCard.name !== store.secondCard.name"
            :class="['button', 'is-primary', { 'is-light': !store.isSuited }]"
            type="button"
            @click="onSuitedButtonClick"
          >
            Одномастные
          </button>
        </div>
        <div class="is-flex mb-2">
          <FieldWithControls
            class="my-form__field is-flex-grow-1 is-flex-shrink-1 pr-1"
            v-model:model-value="store.stack"
            :min="0"
            :step="50"
            label="Стек"
          />
          <FieldWithControls
            class="my-form__field is-flex-grow-1 is-flex-shrink-1 pl-1"
            v-model:model-value="store.bigBlind"
            :min="0"
            :step="50"
            label="ББ"
          />
        </div>
        <div class="is-flex">
          <FieldWithControls
            class="my-form__field is-flex-grow-1 is-flex-shrink-1 pr-1"
            v-model:model-value="store.ante"
            :min="0"
            :step="50"
            label="Анте"
          />
          <FieldWithControls
            class="my-form__field is-flex-grow-1 is-flex-shrink-1 pl-1"
            v-model:model-value="store.playersNumber"
            :min="0"
            :max="10"
            :step="1"
            label="Игроков"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cards } from "@/helpers/lib";
import { useAppStore } from "@/store/index";
import FieldWithControls from "./FieldWithControls.vue";

const store = useAppStore();

const onSuitedButtonClick = () => {
  store.UPDATE_IS_SUITED(!store.isSuited);
};
</script>

<style lang="scss">
.my-form {
  &__field {
    flex-basis: 0;
    min-width: 0;
  }
}
</style>
