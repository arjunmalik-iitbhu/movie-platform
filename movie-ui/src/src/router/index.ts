import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/movies',
      name: 'movies',
      component: HomeView,
      alias: '/'
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/actors',
      name: 'actors',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/directors',
      name: 'directors',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router