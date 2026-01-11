<script setup lang="ts">
import { onMounted } from 'vue'
import ActionsBar from '@/components/ActionsBar.vue'
import Filter from '@/components/SearchFilter.vue'
import Item from '@/components/EntityItem.vue'
import { useInfoStore } from '@/stores/store'
import { GENRE, DEFAULT_IMAGE, ENTITIES } from '@/constants'

const store = useInfoStore()

onMounted(async () => {
  if (!store.data.genres.length) store.fetch(GENRE)
})
</script>

<template>
  <main class="genres">
    <ActionsBar class="genre-actions" entity="genre" />
    <h1 class="genre-title">Genres</h1>
    <Filter entity="genre" :filterEntities="[ENTITIES[1]]" class="genre-filter" />
    <div class="genre-items">
      <div v-for="genre in store.data.genres" v-bind:key="genre.id">
        <Item
          :id="String(genre.id)"
          :entity="GENRE"
          :imageSrc="genre.imageSrc || DEFAULT_IMAGE"
          :title="genre.name"
          :subtitle="String(genre.id)"
        />
      </div>
    </div>
  </main>
</template>

<style>
.genres {
  display: flex;
  flex-direction: column;
  flex: 1;
  .genre-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .genre-items {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .genre-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .genre-filter {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
