<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { DIRECTOR } from '@/constants'

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
    <h1 class="director-title">{{ store.data[`all${DIRECTOR}s`][id]?.name }}</h1>
    <h5 class="director-subtitle">{{ store.data[`all${DIRECTOR}s`][id]?.id }}</h5>
  </main>
</template>

<style>
.director {
  display: flex;
  flex-direction: column;
  flex: 1;
  .director-actions {
    display: flex;
    justify-content: flex-end;
  }
  .director-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .director-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
