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
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
      </nav>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  .navigate {
    position: fixed;
    left: 0;
    height: 100%;
    padding: 2rem;
    .navigate-items {
      display: flex;
      place-items: center;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
