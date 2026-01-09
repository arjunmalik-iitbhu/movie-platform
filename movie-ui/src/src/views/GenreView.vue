<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { GENRE, DEFAULT_IMAGE } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(GENRE, { 'id': Number(props.id) })
})

</script>

<template>
  <main class="genre">
    <ActionsBar class="genre-actions" entity="genre"/>
    <img :src="store.data[`all${GENRE}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="genre-title">{{ store.data[`all${GENRE}s`][id]?.name }}</h1>
    <h5 class="genre-subtitle">{{ store.data[`all${GENRE}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.genre {
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
  .genre-actions {
    display: flex;
    justify-content: flex-end;
  }
  .genre-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 30vh;
    margin-left: 5vw;
  }
  .genre-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 33vh;
    margin-left: 5vw;
  }
  .genre-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
