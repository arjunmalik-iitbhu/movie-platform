<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue'
import { toTitleCase } from '@/utilities'
import { MOVIE, DEFAULT_IMAGE, GENRE } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(GENRE, { id: Number(props.id) })
})
</script>

<template>
  <main class="genre">
    <ActionsBar class="genre-actions" entity="genre" />
    <img class="genre-image" :src="store.data[`all${GENRE}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="genre-title">{{ store.data[`all${GENRE}s`][id]?.name }}</h1>
    <h5 class="genre-subtitle">{{ store.data[`all${GENRE}s`][id]?.id }}</h5>
    <div class="genre-subentity">
      <div class="genre-subentity-bar">
        <div class="genre-subentity-title">
          {{ toTitleCase(`${MOVIE}s`) }}
        </div>
      </div>
      <div class="genre-subentity-items">
        <div
          class="genre-subentity-item"
          v-for="elem in Object.keys(store.data[`all${MOVIE}s`])
            .filter((k) =>
              store.data[`all${MOVIE}s`][k]?.genres?.some(
                (e) => e.name === store.data[`all${GENRE}s`][id]?.name,
              ),
            )
            .map((k) => store.data[`all${MOVIE}s`][k])"
          :key="elem?.id"
        >
          <img :src="elem?.imageSrc || DEFAULT_IMAGE" />
          <div class="details">
            <h2>{{ elem?.title }}</h2>
            <h4>{{ elem?.releaseYear }}</h4>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.genre {
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
  .genre-image {
    background-image: linear-gradient(
      180deg,
      var(--color-background),
      var(--color-background-black)
    );
  }
  .genre-actions {
    display: flex;
    justify-content: flex-end;
  }
  .genre-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 25vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 5rem;
  }
  .genre-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 34vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 1rem;
  }
  .genre-subentity {
    display: flex;
    flex-direction: column;
    .genre-subentity-bar {
      display: flex;
      flex-direction: row;
    }
    .genre-subentity-title {
      display: flex;
      flex-direction: row;
      font-size: xx-large;
    }
    .unselected {
      color: var(--color-text-white);
      background-color: var(--color-button-unselect);
    }
    .selected {
      color: var(--color-text-white);
      background-color: var(--color-background-primary-darker);
    }
    button:hover {
      cursor: pointer;
      background-color: var(--color-background-secondary);
    }
    .genre-subentity-items {
      display: flex;
      flex-direction: column;
      padding-top: 1rem;
      .genre-subentity-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 1px solid var(--color-primary);
        gap: 2rem;
        padding-top: 0.5rem;
        width: 100%;
        img {
          display: flex;
          height: 10rem;
        }
        .details {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .extra-details {
          display: flex;
          font-size: xx-large;
        }
      }
    }
  }
}
</style>
