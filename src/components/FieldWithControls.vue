<template>
  <div class="is-flex is-align-items-center">
    <button class="button is-small mr-1" type="button">
      <span class="icon is-small">
        <i class="mdi mdi-minus"></i>
      </span>
    </button>
    <div class="control has-icons-left is-flex-grow-1">
      <input
        class="input"
        :value="modelValue"
        type="number"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        @input="onInputChange"
      />
      <span class="icon is-small is-left">
        <i :class="iconClass"></i>
      </span>
    </div>
    <button class="button is-small ml-1" type="button">
      <span class="icon is-small">
        <i class="mdi mdi-plus"></i>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

interface Props {
  modelValue: number;
  iconClass?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  step?: number;
}

const props = defineProps<Props>();

const inputValue = ref<number>(props.modelValue);

const emits = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const onInputChange = (event: Event) => {
  const target: EventTarget | null = event.target;

  if (!target) return;

  emits("update:modelValue", +(target as HTMLInputElement).value);
};
</script>
