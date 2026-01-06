<script setup lang="ts">
import Actions from '../components/Actions.vue'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="movies">
    <Actions class="movie-actions"/>
    <h1>Movies</h1>
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
}
</style>
