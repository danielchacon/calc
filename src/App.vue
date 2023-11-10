<template>
  <MyForm />
  <MyResults />
</template>

<script setup lang="ts">
import MyForm from "./components/MyForm.vue";
import MyResults from "./components/MyResults.vue";
</script>

<style lang="scss">
@import "~bulma";

html,
body {
  margin: 0;
}
</style>
