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
            <td class="is-size-4">{{ store.currentHandPower }}</td>
            <td class="is-size-4">{{ store.mValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/index";

const store = useAppStore();
</script>
