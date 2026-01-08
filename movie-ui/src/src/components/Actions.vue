<script setup lang="ts">
import { ref } from 'vue'
import { useInfoStore } from '@/stores/store'
import AddIcon from '@/components/icons/IconAdd.vue'
import MoreVertIcon from '@/components/icons/IconMoreVert.vue'
import type { ENTITIES, ENTITY_TYPE, EntityInterface } from '@/constants'

const ADD_ENTITY_FIELDS: Record<ENTITY_TYPE, {name: string, type: string, required: boolean}[]> = {
  movie: [
    {
      name: "title",
      type: "string",
      required: true
    },
    {
      name: "releaseYear",
      type: "number",
      required: true
    },
    {
      name: "imageSrc",
      type: "number",
      required: false
    }
  ],
  genre: [
    {
      name: "name",
      type: "string",
      required: true
    },
    {
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  actor: [
    {
      name: "name",
      type: "string",
      required: true
    },
    {
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  director: [
    {
      name: "name",
      type: "string",
      required: true
    },
    {
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
};

const store = useInfoStore()
const addMovieModalVisible = ref(false)
const moreActionsVisible = ref(false)

const props = defineProps<{
  entity: ENTITY_TYPE,
}>()

const getEntityInput = (className: string): string => (
  (document.getElementsByClassName(className)[0] as HTMLInputElement)?.value || ""
)

const toggleAddEntity = () => {
  addMovieModalVisible.value = !addMovieModalVisible.value
}

const toggleMoreActions = () => {
  moreActionsVisible.value = !moreActionsVisible.value
}
</script>

<template>
  <div class="actions">
    <div class="add-action">
      <button class="add-action-button" v-on:click="toggleAddEntity">
        <AddIcon />
      </button>
      <template v-if="addMovieModalVisible">
        <div class="add-action-modal">
          <dialog class="add-entity">
            <h4>Add {{ entity }}</h4>
            <div class="add-entity-input" v-for="field in ADD_ENTITY_FIELDS[entity]">
              {{ field.name }} {{ field.required ? '': ' [optional]' }}
              <input :class="`input-${field.name}`" :type="field.type" :required="field.required"/>
            </div>
            <button
              class="add-entity-button"
              :disabled="ADD_ENTITY_FIELDS[entity].reduce(
                (curr, elem) => (
                  curr || (elem.required && !Boolean(getEntityInput(`input-${elem.name}`)))
                ),
                false
              )"
              v-on:click="store.add(
                entity,
                ADD_ENTITY_FIELDS[entity].reduce(
                  (curr, elem) => (
                    Object.assign(
                      curr,
                      {[elem.name]: getEntityInput(`input-${elem.name}`)}
                    )
                  ),
                  {} as EntityInterface
                )
              )"
            >
              Submit
            </button>
          </dialog>
        </div>
      </template>
    </div>
    <div class="more-actions">
      <button class="more-action" v-on:click="toggleMoreActions">
        <MoreVertIcon />
      </button>
      <template v-if="moreActionsVisible">
        <div class="more-actions-menu">
          <div class="nav-toggle">
            <button class="nav-toggle-action" v-on:click="store.toggleNavBar()">
              Toggle Navigation Bar
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.actions {
  display: flex;
  flex-direction: row;
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
  .add-action {
    display: flex;
  }
}
</style>
