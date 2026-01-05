<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/icons/Menu.vue'

</script>

<template>
  <div class="main">
    <div class="navigate">
      <nav>
        <div class="navigate-items">
          <button class="nav-toggle">
            <Menu />
          </button>
          <div class="nav-item">
            <Menu />
            <RouterLink to="/movies">Movies</RouterLink>
          </div>
          <div class="nav-item">
            <Menu />
            <RouterLink to="/genres">Genres</RouterLink>
          </div>
          <div class="nav-item">
            <Menu />
            <RouterLink to="/actors">Actors</RouterLink>
          </div>
          <div class="nav-item">
            <Menu />
            <RouterLink to="/directors">Directors</RouterLink>
          </div>
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
    padding-top: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    .navigate-items {
      display: flex;
      place-items: center;
      flex-direction: column;
      gap: 2.5rem;
      .nav-toggle {
        background-color: var(--color-white-soft);
        border: none;
      }
      .nav-item {
        display: flex;
        flex-direction: column;
        place-items: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
      }
      .nav-toggle:hover {
        cursor: pointer;
      }
      .nav-item:hover {
        background-color: var(--color-primary);
        cursor: pointer;
        a:hover {
          background-color: initial;
        }
      }
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