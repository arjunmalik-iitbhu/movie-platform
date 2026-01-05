<script setup lang="ts">
import AddIcon from '@/components/icons/IconAdd.vue'
import MoreVertIcon from '@/components/icons/IconMoreVert.vue'

const showMoreActions = () => {
  alert("More actions")
}

</script>

<template>
  <div class="actions">
    <button class="more-action" v-on:click="showMoreActions">
      <MoreVertIcon />
    </button>
  </div>
</template>

<style>
.actions {
  display: flex;
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
