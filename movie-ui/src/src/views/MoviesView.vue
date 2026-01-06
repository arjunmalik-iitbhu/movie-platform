<script setup lang="ts">
import Actions from '@/components/Actions.vue'
import Filter from '@/components/Filter.vue'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="movies">
    <Actions class="movie-actions"/>
    <h1 class="movie-title">Movies</h1>
    <Filter entity="movie" class="movie-filter"/>
    <TheWelcome />
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
