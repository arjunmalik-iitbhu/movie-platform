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
    <button class="more-action" v-on:click="toggleMoreActions">
      <MoreVertIcon />
    </button>
  </div>
  <template v-if="moreActionsVisible">
    <div class="more-actions">
      <div class="nav-toggle">
        <button class="nav-toggle-action" v-on:click="store.toggleNavBar()">
          Toggle Navigation Bar
        </button>
      </div>
    </div>
  </template>
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
  }
  button:hover {
    cursor: pointer;
    background-color: var(--color-primary);
  }
}
</style>
