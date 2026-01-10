<script setup lang="ts">
import { ref } from 'vue'
import { useInfoStore } from '@/stores/store'
import AddIcon from '@/components/icons/IconAdd.vue'
import MoreVertIcon from '@/components/icons/IconMoreVert.vue'
import type { ENTITY_TYPE, EntityInterface } from '@/constants'
import { ADD_ENTITY_FIELDS } from '@/constants'
import { toTitleCase } from '@/utilities'

const DIALOG_CLASS = 'add-entity'

const store = useInfoStore()
const moreActionsVisible = ref(false)

const props = defineProps<{
  entity: ENTITY_TYPE
}>()

const getEntityInput = (className: string): string =>
  (document.getElementsByClassName(className)[0] as HTMLInputElement)?.value || ''

const toggleMoreActions = () => {
  moreActionsVisible.value = !moreActionsVisible.value
}

const showAddEntity = () => {
  const elem = document.getElementsByClassName(DIALOG_CLASS)[0] as HTMLDialogElement
  elem.showModal()
}

const closeAddEntity = () => {
  const elem = document.getElementsByClassName(DIALOG_CLASS)[0] as HTMLDialogElement
  elem.close()
}

const addEntity = () => {
  store.add(
    props.entity,
    ADD_ENTITY_FIELDS[props.entity].reduce(
      (curr, elem) => Object.assign(curr, { [elem.name]: getEntityInput(`input-${elem.name}`) }),
      {} as EntityInterface,
    ),
  )
  closeAddEntity()
}
</script>

<template>
  <div class="actions">
    <div class="add-action">
      <button class="add-action-button" v-on:click="showAddEntity">
        <AddIcon />
      </button>
      <div class="add-action-modal">
        <dialog :class="DIALOG_CLASS">
          <h2>Add {{ toTitleCase(entity) }}</h2>
          <div
            class="add-entity-input"
            v-for="field in ADD_ENTITY_FIELDS[entity]"
            v-bind:key="field.name"
          >
            <p>{{ `${field.prettyName}` }} {{ field.required ? '' : ' [optional]' }}</p>
            <input :class="`input-${field.name}`" :type="field.type" :required="field.required" />
          </div>
          <div class="add-entity-button">
            <button
              class="add-entity-submit-button"
              :disabled="
                false &&
                ADD_ENTITY_FIELDS[entity].reduce(
                  (curr, elem) =>
                    curr || (elem.required && !Boolean(getEntityInput(`input-${elem.name}`))),
                  false,
                )
              "
              v-on:click="addEntity"
            >
              Submit
            </button>
            <button class="add-entity-close-button" v-on:click="closeAddEntity">Close</button>
          </div>
        </dialog>
      </div>
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
  .add-action-modal {
    display: flex;
    flex-direction: column;
    .add-entity {
      background-color: var(--color-background);
      position: fixed;
      top: 20vh;
      left: 40vw;
      h2 {
        text-align: center;
      }
      .add-entity-input {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-self: stretch;
        align-items: space-between;
        input {
          display: flex;
          flex: 1;
        }
      }
      .add-entity-button {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        button {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    }
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
