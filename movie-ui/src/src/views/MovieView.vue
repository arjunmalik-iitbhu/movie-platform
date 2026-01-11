<script setup lang="ts">
import { ref } from 'vue'
import ActionsBar from '@/components/ActionsBar.vue'
import { useInfoStore } from '@/stores/store'
import { onMounted } from 'vue'
import { toTitleCase } from '@/utilities'
import type { ENTITY_TYPE, MovieRating } from '@/constants'
import {
  MOVIE,
  DEFAULT_IMAGE,
  ENTITIES,
  MOVIE_RATING,
  GENRE,
  ACTOR,
  DIRECTOR,
  ADD_SUB_ENTITY_FIELDS,
} from '@/constants'
import AddIcon from '@/components/icons/IconAdd.vue'

const SUBENTITIES = ENTITIES

type SUBENTITY_TYPE = ENTITY_TYPE

const ADD_SUBENTITY_DIALOG = 'movie-add-subentity-dialog'
const ADD_SUBENTITY_INPUT = 'movie-add-subentity-input'

const props = defineProps<{
  id: string
}>()

const store = useInfoStore()

const selectedSubentity = ref<SUBENTITY_TYPE>(MOVIE_RATING)

const selectSubentity = (subentity: SUBENTITY_TYPE) => {
  selectedSubentity.value = subentity
}

const addSubEntity = () => {
  if (selectedSubentity.value === MOVIE_RATING) {
    const data = ADD_SUB_ENTITY_FIELDS[MOVIE][selectedSubentity.value].reduce(
      (c, e) =>
        Object.assign(c, {
          [e.name]: (
            document.getElementsByClassName(
              `${ADD_SUBENTITY_INPUT}-${e.name}`,
            )[0] as HTMLInputElement
          )?.value,
        }),
      { movieId: props.id } as unknown as MovieRating,
    )
    store.add(MOVIE_RATING, data)
  } else {
    store.addSubEntity(MOVIE, selectedSubentity.value, {
      entity_id: Number(props.id),
      subentity_id: Number(
        (
          document.getElementsByClassName(
            `${ADD_SUBENTITY_INPUT}-${ADD_SUB_ENTITY_FIELDS[MOVIE][selectedSubentity.value][0]?.name}`,
          )[0] as HTMLInputElement
        )?.value,
      ),
    })
  }
  closeSubEntityDialog()
}

const showSubEntityDialog = () => {
  ;(document.getElementsByClassName(ADD_SUBENTITY_DIALOG)[0] as HTMLDialogElement)?.showModal()
}

const closeSubEntityDialog = () => {
  ;(document.getElementsByClassName(ADD_SUBENTITY_DIALOG)[0] as HTMLDialogElement)?.close()
}

onMounted(async () => {
  store.fetchOne(MOVIE, { id: Number(props.id) })
})
</script>

<template>
  <main class="movie">
    <ActionsBar class="movie-actions" entity="movie" />
    <img class="movie-image" :src="store.data[`all${MOVIE}s`][id]?.imageSrc || DEFAULT_IMAGE" />
    <h1 class="movie-title">{{ store.data[`all${MOVIE}s`][id]?.title }}</h1>
    <h5 class="movie-subtitle">{{ store.data[`all${MOVIE}s`][id]?.releaseYear }}</h5>
    <div class="movie-subentity">
      <div class="movie-subentity-bar">
        <div class="movie-subentity-select">
          <button
            class="movie-subentity-select-item"
            :class="selectedSubentity === subentity ? 'selected' : 'unselected'"
            v-for="subentity in SUBENTITIES.filter((e) => e !== MOVIE)"
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
            <div
              class="movie-add-subentity-input"
              v-for="elem in ADD_SUB_ENTITY_FIELDS[MOVIE][selectedSubentity]"
              :key="elem.name"
            >
              <p>{{ elem.prettyName }} {{ elem.required ? '' : ' [optional]' }}</p>
              <input
                :class="`${ADD_SUBENTITY_INPUT}-${elem.name}`"
                :type="elem.type"
                :name="elem.name"
              />
            </div>
            <div class="movie-add-subentity-buttons">
              <button class="submit" v-on:click="addSubEntity">Submit</button>
              <button class="close" v-on:click="closeSubEntityDialog">Close</button>
            </div>
          </dialog>
        </div>
      </div>
      <div class="movie-subentity-items">
        <template v-if="selectedSubentity === GENRE">
          <div
            class="movie-subentity-item"
            v-for="elem in store.data[`all${MOVIE}s`][id]?.genres"
            :key="elem?.id"
          >
            <img :src="elem.imageSrc || DEFAULT_IMAGE" />
            <div class="details">
              <h2>{{ elem.name }}</h2>
              <h4>{{ elem.id }}</h4>
            </div>
          </div>
        </template>
        <template v-if="selectedSubentity === ACTOR">
          <div
            class="movie-subentity-item"
            v-for="elem in store.data[`all${MOVIE}s`][id]?.actors"
            :key="elem.id"
          >
            <img :src="elem.imageSrc || DEFAULT_IMAGE" />
            <div class="details">
              <h2>{{ elem.name }}</h2>
              <h4>{{ elem.id }}</h4>
            </div>
          </div>
        </template>
        <template
          v-if="selectedSubentity === DIRECTOR && store.data[`all${MOVIE}s`][id]?.director?.id"
        >
          <div class="movie-subentity-item">
            <img :src="store.data[`all${MOVIE}s`][id]?.director?.imageSrc || DEFAULT_IMAGE" />
            <div class="details">
              <h2>{{ store.data[`all${MOVIE}s`][id]?.director?.name }}</h2>
              <h4>{{ store.data[`all${MOVIE}s`][id]?.director?.id }}</h4>
            </div>
          </div>
        </template>
        <template v-if="selectedSubentity === MOVIE_RATING">
          <div
            class="movie-subentity-item"
            v-for="elem in store.data[`all${MOVIE}s`][id]?.ratings"
            :key="elem.id"
          >
            <img :src="DEFAULT_IMAGE" />
            <div class="details">
              <h2>
                Story {{ elem.story }}/5 · Direction {{ elem.direction }}/5 · Acting
                {{ elem.acting }}/5
              </h2>
              <h4>{{ elem.comment }}</h4>
            </div>
            <div class="extra-details">
              {{ '★'.repeat(Math.floor((elem.story + elem.direction + elem.acting) / 3)) }}
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
    background-image: linear-gradient(
      180deg,
      var(--color-background),
      var(--color-background-black)
    );
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
        top: 30vh;
        left: 45vw;
        padding: 1rem;
        .movie-add-subentity-input {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          gap: 0.5rem;
        }
        .movie-add-subentity-buttons {
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          button {
            display: flex;
            border: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
          }
        }
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
