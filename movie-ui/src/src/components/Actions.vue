<script setup lang="ts">
import { ref } from 'vue'
import { useInfoStore } from '@/stores/store'
import AddIcon from '@/components/icons/IconAdd.vue'
import MoreVertIcon from '@/components/icons/IconMoreVert.vue'

const store = useInfoStore();
const moreActionsVisible = ref(false);

const toggleMoreActions = () => {
  moreActionsVisible.value = !moreActionsVisible.value
}

</script>

<template>
  <div class="actions">
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
  flex-direction: column;
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
    background-color: var(--color-primary);
  }
  .more-actions-menu {
    position: fixed;
    top: auto;
    right: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10rem;
    border: 1px solid black;
    border-radius: 1rem;
    z-index: 10;
  }
}
</style>
