<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/icons/Menu.vue'

</script>

<template>
  <div class="main">
    <div class="navigate">
      <nav>
        <div class="navigate-items">
          <Menu />
          <RouterLink to="/movies">Movies</RouterLink>
          <RouterLink to="/genres">Genres</RouterLink>
          <RouterLink to="/actors">Actors</RouterLink>
          <RouterLink to="/directors">Directors</RouterLink>
        </div>
      </nav>
    </div>
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  .navigate {
    display: flex;
    place-items: flex-start;
    padding: 2rem;
    .navigate-items {
      display: flex;
      place-items: center;
      flex-direction: column;
      gap: 2rem;
    }
  }
  .view {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>