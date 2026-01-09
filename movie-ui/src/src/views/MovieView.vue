<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { MOVIE } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(MOVIE, { 'id': Number(props.id) })
})

</script>

<template>
  <main class="movie">
    <ActionsBar class="movie-actions" entity="movie"/>
    <h1 class="movie-title">{{ store.data[`all${MOVIE}s`][id]?.title }}</h1>
    <h5 class="movie-subtitle">{{ store.data[`all${MOVIE}s`][id]?.releaseYear }}</h5>
  </main>
</template>

<style>
.movie {
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
