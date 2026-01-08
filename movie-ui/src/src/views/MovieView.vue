<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'

defineProps<{
  id: string
}>()
</script>

<template>
  <main class="movie">
    <ActionsBar class="movie-actions" />
    <h1 class="movie-title">Movie</h1>
  </main>
</template>

<style>
.movies {
  display: flex;
  flex-direction: column;
  flex: 1;
  .movie-actions {
    display: flex;
    justify-content: flex-end;
  }
  .movie-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .movie-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
