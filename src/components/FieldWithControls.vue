<template>
  <div>
    <div v-if="label" class="is-size-7 mb-1">
      <span class="has-text-weight-bold">{{ label }}</span> (шаг =
      {{ currentStep }})
    </div>
    <div class="is-flex is-align-items-center">
      <button
        class="button is-small mr-1"
        type="button"
        :disabled="isMin"
        @click="decrease"
      >
        <span class="icon is-small">
          <i class="mdi mdi-minus"></i>
        </span>
      </button>
      <div class="control is-flex-grow-1">
        <input
          class="input"
          :value="modelValue"
          type="number"
          :min="min"
          :max="max"
          :placeholder="placeholder"
          @input="onInputChange"
        />
      </div>
      <button
        class="button is-small ml-1"
        type="button"
        :disabled="isMax"
        @click="increase"
      >
        <span class="icon is-small">
          <i class="mdi mdi-plus"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from "vue";

interface Props {
  modelValue: number;
  label?: string;
  iconClass?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  step?: number;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const currentStep = computed(() => (props.step ? props.step : 1));

const isMin = computed(() => {
  return props.min !== undefined && props.modelValue === props.min;
});

const isMax = computed(() => {
  return props.max !== undefined && props.modelValue === props.max;
});

const onInputChange = (event: Event) => {
  const target: EventTarget | null = event.target;

  if (!target) return;

  emits("update:modelValue", +(target as HTMLInputElement).value);
};

const decrease = () => {
  emits("update:modelValue", props.modelValue - currentStep.value);
};

const increase = () => {
  emits("update:modelValue", props.modelValue + currentStep.value);
};
</script>
