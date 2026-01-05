<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
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
            <div
              class="nav-icon"
              :class="useRoute().path === '/movies' ? 'selected' : 'unselected'"
            >
              <Menu />
            </div>
            <RouterLink to="/movies">Movies</RouterLink>
          </div>
          <div class="nav-item">
            <div
              class="nav-icon"
              :class="useRoute().path === '/genres' ? 'selected' : 'unselected'"
            >
              <Menu />
            </div>
            <RouterLink to="/genres">Genres</RouterLink>
          </div>
          <div class="nav-item">
            <div
              class="nav-icon"
              :class="useRoute().path === '/actors' ? 'selected' : 'unselected'"
            >
              <Menu />
            </div>
            <RouterLink to="/actors">Actors</RouterLink>
          </div>
          <div class="nav-item">
            <div
              class="nav-icon"
              :class="useRoute().path === '/directors' ? 'isSelected' : 'isUnselected'"
            >
              <Menu />
            </div>
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
      svg {
        width: 2.5vw;
        height: 2.5vh;
      }
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
        .nav-icon {
          padding-left: 1rem;
          padding-right: 1rem;
          border-radius: 1.5rem;
        }
        .selected {
          background-color: var(--color-primary);
        }
      }
      .nav-toggle:hover {
        cursor: pointer;
      }
      .nav-item:hover {
        color: --color-text;
        a:hover {
          background-color: var(--color-primary);
          cursor: pointer;
        }
      }
    }
  }
  .view {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    overflow: auto;
    padding: 5rem;
  }
}
</style>