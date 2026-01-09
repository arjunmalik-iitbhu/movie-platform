<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { DIRECTOR, DEFAULT_IMAGE } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(DIRECTOR, { 'id': Number(props.id) })
})

</script>

<template>
  <main class="director">
    <ActionsBar class="director-actions" entity="director"/>
    <img :src="store.data[`all${DIRECTOR}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="director-title">{{ store.data[`all${DIRECTOR}s`][id]?.name }}</h1>
    <h5 class="director-subtitle">{{ store.data[`all${DIRECTOR}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.director {
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
  .director-actions {
    display: flex;
    justify-content: flex-end;
  }
  .director-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 30vh;
    margin-left: 5vw;
  }
  .director-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 33vh;
    margin-left: 5vw;
  }
  .director-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
