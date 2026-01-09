<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { ACTOR } from '@/constants'

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
    <h1 class="actor-title">{{ store.data[`all${ACTOR}s`][id]?.name }}</h1>
    <h5 class="actor-subtitle">{{ store.data[`all${ACTOR}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.actor {
  display: flex;
  flex-direction: column;
  flex: 1;
  .actor-actions {
    display: flex;
    justify-content: flex-end;
  }
  .actor-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .actor-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
