<script setup lang="ts">
import { onMounted } from 'vue'
import ActionsBar from '@/components/ActionsBar.vue'
import Filter from '@/components/SearchFilter.vue'
import Item from '@/components/EntityItem.vue'
import { useInfoStore } from '@/stores/store'
import { DIRECTOR, DEFAULT_IMAGE } from '@/constants'

const store = useInfoStore()

onMounted(async () => {
  if (!store.data.directors.length) store.fetch(DIRECTOR)
})
</script>

<template>
  <main class="directors">
    <ActionsBar class="director-actions" entity="director"/>
    <h1 class="director-title">Movies</h1>
    <Filter entity="director" class="director-filter" />
    <div class="director-items">
      <div v-for="director in store.data.directors" v-bind:key="director.id">
        <Item
          :id="String(director.id)"
          :entity="DIRECTOR"
          :imageSrc="director.imageSrc || DEFAULT_IMAGE"
          :title="director.name"
          :subtitle="String(director.id)"
        />
      </div>
    </div>
  </main>
</template>

<style>
.directors {
  display: flex;
  flex-direction: column;
  flex: 1;
  .director-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .director-items {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
