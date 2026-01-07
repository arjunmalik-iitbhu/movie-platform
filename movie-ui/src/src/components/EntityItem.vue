<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ENTITY_TYPE } from '@/constants'

const router = useRouter()

const props = defineProps<{
  id: string
  entity: ENTITY_TYPE
  imagesrc: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="entity-item">
    <button class="entity-item-button" v-on:click="router.push(`/${entity}/${id}`)">
      <img :src="imagesrc" />
      <h5>{{ title }}</h5>
      <h6>{{ subtitle }}</h6>
    </button>
  </div>
</template>

<style>
.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  button {
    background-color: var(--color-white-soft);
    border: none;
    border-radius: 0.5rem;
    height: 5vh;
  }
  button:hover {
    cursor: pointer;
    background-color: var(--color-hover);
  }
  .more-actions-menu {
    position: fixed;
    top: auto;
    right: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    z-index: 10;
    box-shadow: 0 4px 6px var(--color-border-hover);
  }
}
</style>
