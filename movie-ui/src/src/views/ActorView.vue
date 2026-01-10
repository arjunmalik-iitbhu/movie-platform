<script setup lang="ts">
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue'
import { toTitleCase } from '@/utilities'
import { MOVIE, DEFAULT_IMAGE, ACTOR } from '@/constants'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

onMounted(async () => {
  store.fetchOne(ACTOR, { id: Number(props.id) })
})
</script>

<template>
  <main class="actor">
    <ActionsBar class="actor-actions" entity="actor" />
    <img class="actor-image" :src="store.data[`all${ACTOR}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="actor-title">{{ store.data[`all${ACTOR}s`][id]?.name }}</h1>
    <h5 class="actor-subtitle">{{ store.data[`all${ACTOR}s`][id]?.id }}</h5>
    <div class="actor-subentity">
      <div class="actor-subentity-bar">
        <div class="actor-subentity-title">
          {{ toTitleCase(`${MOVIE}s`) }}
        </div>
      </div>
      <div class="actor-subentity-items">
        <div
          class="actor-subentity-item"
          v-for="elem in Object.keys(store.data[`all${MOVIE}s`])
            .filter((k) =>
              store.data[`all${MOVIE}s`][k]?.actors?.some(
                (e) => e.name === store.data[`all${ACTOR}s`][id]?.name,
              ),
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
.actor {
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
  .actor-image {
    background-image: linear-gradient(
      180deg,
      var(--color-background),
      var(--color-background-black)
    );
  }
  .actor-actions {
    display: flex;
    justify-content: flex-end;
  }
  .actor-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 25vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 5rem;
  }
  .actor-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 34vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 1rem;
  }
  .actor-subentity {
    display: flex;
    flex-direction: column;
    .actor-subentity-bar {
      display: flex;
      flex-direction: row;
    }
    .actor-subentity-title {
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
    .actor-subentity-items {
      display: flex;
      flex-direction: column;
      padding-top: 1rem;
      .actor-subentity-item {
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
