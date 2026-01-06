<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import { ENTITIES } from '@/constants'
import type { ENTITY_TYPE } from '@/constants'
import { toTitleCase } from '@/utilities'
import { useInfoStore } from '@/stores/store'

const filterType = ref<ENTITY_TYPE>(ENTITIES[0]);
const filterValue = ref<string>("");
const store = useInfoStore();

const props = defineProps<{
  entity: ENTITY_TYPE
}>();

const filteredEntities = computed(() => ENTITIES.filter(e => e === filterType.value && filterValue.value));

</script>

<template>
  <div class="filter">
    <div class="search">
      <select name="entities" v-model="filterType">
        <option v-for="entity in ENTITIES" :value="entity" :key="entity">
          {{ toTitleCase(entity) }}
        </option>
      </select>
      <input :placeholder="`Search by ${filterType}`" v-model="filterValue">
      <button v-on:click="store.fetch(
        entity,
        {
          offset: store.data[`${entity}smeta`].offset,
          limit: store.data[`${entity}smeta`].limit,
          filters: filteredEntities.map(e => ({entity: filterType, value: filterValue}))
        }
      )">
        <SearchIcon />
      </button>
    </div>
    <div class="selected">
      <p v-for="entity in filteredEntities">
        {{ `${toTitleCase(entity)}: ${filterValue}` }}
      </p>
    </div>
  </div>
</template>

<style>
.filter {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  .search {
    display: flex;
    flex-direction: row;
    border: none;
    select {
      background-color: var(--color-background-primary);
      border: none;
      border-radius: 1rem 0 0 1rem;
    }
    option {
      background-color: var(--color-background);
    }
    option:hover {
      background-color: var(--color-hover);
    }
    input {
      background-color: var(--color-background-primary);
      border: none;
    }
    button {
      background-color: var(--color-background-primary);
      border: none;
      border-radius: 0 1rem 1rem 0;
    }
    button:hover {
      cursor: pointer;
    }
  }
  .selected {
    display: flex;
    flex-direction: row;
    p {
      border: 1px solid var(--color-border);
      padding: 1rem;
    }
  }
}
</style>