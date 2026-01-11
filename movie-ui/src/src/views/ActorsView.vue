<script setup lang="ts">
import { onMounted } from 'vue'
import ActionsBar from '@/components/ActionsBar.vue'
import Filter from '@/components/SearchFilter.vue'
import Item from '@/components/EntityItem.vue'
import { useInfoStore } from '@/stores/store'
import { ACTOR, DEFAULT_IMAGE, ENTITIES } from '@/constants'

const store = useInfoStore()

onMounted(async () => {
  if (!store.data.actors.length) store.fetch(ACTOR)
})
</script>

<template>
  <main class="actors">
    <ActionsBar class="actor-actions" entity="actor" />
    <h1 class="actor-title">Actors</h1>
    <Filter entity="actor" :filterEntities="[ENTITIES[2]]" class="actor-filter" />
    <div class="actor-items">
      <div v-for="actor in store.data.actors" v-bind:key="actor.id">
        <Item
          :id="String(actor.id)"
          :entity="ACTOR"
          :imageSrc="actor.imageSrc || DEFAULT_IMAGE"
          :title="actor.name"
          :subtitle="String(actor.id)"
        />
      </div>
    </div>
  </main>
</template>

<style>
.actors {
  display: flex;
  flex-direction: column;
  flex: 1;
  .actor-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .actor-items {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
