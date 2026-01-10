<script setup lang="ts">
import { ref } from 'vue'
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue';
import { toTitleCase } from '@/utilities'
import { MOVIE, DEFAULT_IMAGE, ENTITIES, MOVIE_RATING, type ENTITY_TYPE, GENRE, ACTOR, DIRECTOR } from '@/constants'
import AddIcon from '@/components/icons/IconAdd.vue'

type SUBENTITY_TYPE = ENTITY_TYPE;

const SUBENTITIES = [...ENTITIES] as SUBENTITY_TYPE[];

const ADD_SUBENTITY_DIALOG = "movie-add-subentity-dialog"

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

const selectedSubentity = ref(MOVIE_RATING)

const selectSubentity = (subentity: SUBENTITY_TYPE) => {
  selectedSubentity.value = subentity;
}

const addSubEntity = () => {
  return;
}

const showSubEntityDialog = () => {
  (document.getElementsByClassName(ADD_SUBENTITY_DIALOG)[0] as HTMLDialogElement)?.showModal()
}

const closeSubEntityDialog = () => {
  (document.getElementsByClassName(ADD_SUBENTITY_DIALOG)[0] as HTMLDialogElement)?.close()
}

onMounted(async () => {
  store.fetchOne(MOVIE, { 'id': Number(props.id) })
})

</script>

<template>
  <main class="movie">
    <ActionsBar class="movie-actions" entity="movie"/>
    <img class="movie-image" :src="store.data[`all${MOVIE}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="movie-title">{{ store.data[`all${MOVIE}s`][id]?.title }}</h1>
    <h5 class="movie-subtitle">{{ store.data[`all${MOVIE}s`][id]?.releaseYear }}</h5>
    <div class="movie-subentity">
      <div class="movie-subentity-bar">
        <div class="movie-subentity-select">
          <button
            class="movie-subentity-select-item"
            :class="selectedSubentity === subentity ? 'selected': 'unselected'"
            v-for="subentity in SUBENTITIES"
            :key="subentity"
            v-on:click="selectSubentity(subentity)"
          >
            {{ toTitleCase(`${subentity}s`) }}
          </button>
        </div>
        <div class="movie-add-subentity">
          <button class="movie-add-subentity-button" v-on:click="showSubEntityDialog">
            <AddIcon />
          </button>
          <dialog class="movie-add-subentity-dialog">
            <button class="submit" v-on:click="addSubEntity">Submit</button>
            <button class="close" v-on:click="closeSubEntityDialog">Close</button>
          </dialog>
        </div>
      </div>
      <div class="movie-subentity-items">
        <template v-if="selectedSubentity === GENRE">
          <div class="movie-subentity-item" v-for="elem in store.data[`all${MOVIE}s`][id]?.genres">
            <img :src="elem.imageSrc || DEFAULT_IMAGE">
            <div class="details">
              <h2>{{ elem.name }}</h2>
              <h6>{{ elem.id }}</h6>
            </div>
          </div>
        </template>
        <template v-if="selectedSubentity === ACTOR">
          <div class="movie-subentity-item" v-for="elem in store.data[`all${MOVIE}s`][id]?.actors">
            <img :src="elem.imageSrc || DEFAULT_IMAGE">
            <div class="details">
              <h2>{{ elem.name }}</h2>
              <h6>{{ elem.id }}</h6>
            </div>
          </div>
        </template>
        <template v-if="selectedSubentity === DIRECTOR">
          <div class="movie-subentity-item">
            <img :src="store.data[`all${MOVIE}s`][id]?.director?.imageSrc || DEFAULT_IMAGE">
            <div class="details">
              <h2>{{ store.data[`all${MOVIE}s`][id]?.director?.name }}</h2>
              <h6>{{ store.data[`all${MOVIE}s`][id]?.director?.id }}</h6>
            </div>
          </div>
        </template>
        <template v-if="selectedSubentity === MOVIE_RATING">
          <div class="movie-subentity-item" v-for="elem in store.data[`all${MOVIE}s`][id]?.ratings">
            <img :src="DEFAULT_IMAGE">
            <div class="details">
              <h2>Story {{ elem.story }}/5 · Direction {{ elem.direction }}/5 · Acting {{ elem.acting }}/5</h2>
              <h6>{{ elem.comment }}</h6>
            </div>
            <div class="extra-details">
              {{ "★".repeat(Math.floor((elem.story + elem.direction + elem.acting)/15)) }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style>
.movie {
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
  .movie-image {
    background-image: linear-gradient(180deg, var(--color-background), var(--color-background-black));
  }
  .movie-actions {
    display: flex;
    justify-content: flex-end;
  }
  .movie-title {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 25vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 5rem;
  }
  .movie-subtitle {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: fixed;
    margin-top: 34vh;
    margin-left: 5vw;
    color: var(--color-text-white);
    font-size: 1rem;
  }
  .movie-subentity {
    display: flex;
    flex-direction: column;
    .movie-subentity-bar {
      display: flex;
      flex-direction: row;
    }
    .movie-subentity-select {
      display: flex;
      flex-direction: row;
      gap: 0.2rem;
      .movie-subentity-select-item {
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        font-size: larger;
        border: none;
        border-radius: 2rem;
      }
    }
    .unselected {
      color: var(--color-text-white);
      background-color: var(--color-button-unselect);
    }
    .selected {
      color: var(--color-text-white);
      background-color: var(--color-background-primary-darker);
    }
    .movie-add-subentity {
      display: flex;
      margin-left: auto;
      .movie-add-subentity-button {
        background-color: var(--color-background-soft);
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
      }
      button:hover {
        background-color: var(--color-background-secondary);
      }
      .movie-add-subentity-dialog {
        top: 40vh;
        left: 45vw;
      }
    }
    button:hover {
      cursor: pointer;
      background-color: var(--color-background-secondary);
    }
    .movie-subentity-items {
      display: flex;
      flex-direction: column;
      padding-top: 1rem;
      .movie-subentity-item {
        padding-top: 0.5rem;
        max-height: 10vh;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--color-primary);
        gap: 1rem;
      }
    }
  }
}
</style>
