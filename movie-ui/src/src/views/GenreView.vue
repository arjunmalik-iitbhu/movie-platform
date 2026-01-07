<script setup lang="ts">
import Actions from '@/components/Actions.vue'
import Filter from '@/components/Filter.vue'

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <main class="genre">
    <Actions class="genre-actions" />
    <h1 class="genre-title">Genre</h1>
  </main>
</template>

<style>
.genres {
  display: flex;
  flex-direction: column;
  flex: 1;
  .genre-actions {
    display: flex;
    justify-content: flex-end;
  }
  .genre-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .genre-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
