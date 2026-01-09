<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { GENRE } from '@/constants'

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
    <h1 class="genre-title">{{ store.data[`all${GENRE}s`][id]?.name }}</h1>
    <h5 class="genre-subtitle">{{ store.data[`all${GENRE}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.genre {
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
