<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ENTITY_TYPE } from '@/constants'

const router = useRouter()

defineProps<{
  id: string
  entity: ENTITY_TYPE
  imageSrc: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="entity-item">
    <button class="entity-item-button" v-on:click="router.push(`/${entity}/${id}`)">
      <img :src="imageSrc" />
      <h5>{{ title }}</h5>
      <h6>{{ subtitle }}</h6>
    </button>
  </div>
</template>

<style>
.entity-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  .entity-item-button {
    img {
      height: 20vh;
      width: 20vh;
    }
    border: none;
    border-radius: 1.5rem;
  }
  button:hover {
    cursor: pointer;
    background-color: var(--color-hover);
  }
}
</style>
