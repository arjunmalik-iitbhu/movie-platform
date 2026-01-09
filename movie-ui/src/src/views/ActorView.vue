<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { ACTOR, DEFAULT_IMAGE } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(ACTOR, { 'id': Number(props.id) })
})

</script>

<template>
  <main class="actor">
    <ActionsBar class="actor-actions" entity="actor"/>
    <img :src="store.data[`all${ACTOR}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="actor-title">{{ store.data[`all${ACTOR}s`][id]?.name }}</h1>
    <h5 class="actor-subtitle">{{ store.data[`all${ACTOR}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.actor {
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
  .actor-actions {
    display: flex;
    justify-content: flex-end;
  }
  .actor-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 30vh;
    margin-left: 5vw;
  }
  .actor-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 33vh;
    margin-left: 5vw;
  }
  .actor-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
