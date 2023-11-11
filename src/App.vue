<template>
  <MyForm />
  <MyResults />
  <MyRangeTable />
</template>

<script setup lang="ts">
import MyForm from "@/components/MyForm.vue";
import MyResults from "@/components/MyResults.vue";
import MyRangeTable from "@/components/MyRangeTable.vue";
import { useAppStore } from "@/store/index";
import { onBeforeMount } from "vue";

const store = useAppStore();

onBeforeMount(() => {
  store.INIT_ALL_HANDS();
});
</script>

<style lang="scss">
@import "~bulma";

html,
body {
  margin: 0;
}
</style>
