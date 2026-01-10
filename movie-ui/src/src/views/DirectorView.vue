<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue'
import { toTitleCase } from '@/utilities'
import { MOVIE, DEFAULT_IMAGE, DIRECTOR } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(DIRECTOR, { id: Number(props.id) })
})
</script>

<template>
  <main class="director">
    <ActionsBar class="director-actions" entity="director" />
    <img
      class="director-image"
      :src="store.data[`all${DIRECTOR}s`][id]?.imageSrc || DEFAULT_IMAGE"
    />
    <h1 class="director-title">{{ store.data[`all${DIRECTOR}s`][id]?.name }}</h1>
    <h5 class="director-subtitle">{{ store.data[`all${DIRECTOR}s`][id]?.id }}</h5>
    <div class="director-subentity">
      <div class="director-subentity-bar">
        <div class="director-subentity-title">
          {{ toTitleCase(`${MOVIE}s`) }}
        </div>
      </div>
      <div class="director-subentity-items">
        <div
          class="director-subentity-item"
          v-for="elem in Object.keys(store.data[`all${MOVIE}s`])
            .filter(
              (k) =>
                store.data[`all${MOVIE}s`][k]?.director?.name ===
                store.data[`all${DIRECTOR}s`][id]?.name,
            )
            .map((k) => store.data[`all${MOVIE}s`][k])"
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
.director {
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
  .director-image {
    background-image: linear-gradient(
      180deg,
      var(--color-background),
      var(--color-background-black)
    );
  }
  .director-actions {
    display: flex;
    justify-content: flex-end;
  }
  .director-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 25vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 5rem;
  }
  .director-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 34vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 1rem;
  }
  .director-subentity {
    display: flex;
    flex-direction: column;
    .director-subentity-bar {
      display: flex;
      flex-direction: row;
    }
    .director-subentity-title {
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
    .director-subentity-items {
      display: flex;
      flex-direction: column;
      padding-top: 1rem;
      .director-subentity-item {
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
