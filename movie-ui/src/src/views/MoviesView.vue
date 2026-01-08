<script setup lang="ts">
import { onMounted } from 'vue'
import Actions from '@/components/Actions.vue'
import Filter from '@/components/Filter.vue'
import Item from '@/components/EntityItem.vue'
import { useInfoStore } from '@/stores/store'
import { MOVIE, DEFAULT_IMAGE } from '@/constants'

const store = useInfoStore()

onMounted(async () => {
  if (!store.data.movies.length) store.fetch(MOVIE)
})
</script>

<template>
  <main class="movies">
    <Actions class="movie-actions" entity="movie"/>
    <h1 class="movie-title">Movies</h1>
    <Filter entity="movie" class="movie-filter" />
    <div class="movie-items">
      <div v-for="movie in store.data.movies">
        <Item
          :id="movie.id"
          :entity="MOVIE"
          :imageSrc="movie.imageSrc || DEFAULT_IMAGE"
          :title="movie.title"
          :subtitle="movie.releaseYear"
        />
      </div>
    </div>
  </main>
</template>

<style>
.movies {
  display: flex;
  flex-direction: column;
  flex: 1;
  .movie-actions {
    display: flex;
    flex-direction: row;
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
