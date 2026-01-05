import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import GenresView from '../views/GenresView.vue'
import ActorsView from '../views/ActorsView.vue'
import DirectorsView from '../views/DirectorsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
      alias: '/',
    },
    {
      path: '/genres',
      name: 'genres',
      component: GenresView,
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView,
    },
    {
      path: '/directors',
      name: 'directors',
      component: DirectorsView,
    },
  ],
})

export default router
