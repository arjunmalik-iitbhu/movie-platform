<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { MOVIE, DEFAULT_IMAGE } from '@/constants'

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
    <img :src="store.data[`all${MOVIE}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="movie-title">{{ store.data[`all${MOVIE}s`][id]?.title }}</h1>
    <h5 class="movie-subtitle">{{ store.data[`all${MOVIE}s`][id]?.releaseYear }}</h5>
  </main>
</template>

<style>
.movie {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  img {
    display: flex;
    max-height: 40vh;
    align-self: stretch;
    opacity: 0.5;
    border: 1px solid var(--color-border);
    border-radius: 2rem;
  }
  .movie-actions {
    display: flex;
    justify-content: flex-end;
  }
  .movie-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 30vh;
    margin-left: 5vw;
  }
  .movie-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 33vh;
    margin-left: 5vw;
  }
  .movie-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
