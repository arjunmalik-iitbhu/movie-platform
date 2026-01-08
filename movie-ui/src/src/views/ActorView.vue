<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'

defineProps<{
  id: string
}>()
</script>

<template>
  <main class="actor">
    <ActionsBar class="actor-actions" />
    <h1 class="actor-title">Actor</h1>
  </main>
</template>

<style>
.actors {
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
