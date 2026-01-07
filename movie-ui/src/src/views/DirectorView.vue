<script setup lang="ts">
import Actions from '@/components/Actions.vue'
import Filter from '@/components/Filter.vue'

const props = defineProps<{
  id: string
}>()
</script>

<template>
  <main class="director">
    <Actions class="director-actions" />
    <h1 class="director-title">Director</h1>
  </main>
</template>

<style>
.directors {
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
