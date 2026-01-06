import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import MovieView from '../views/MovieView.vue'
import GenresView from '../views/GenresView.vue'
import GenreView from '../views/GenreView.vue'
import ActorsView from '../views/ActorsView.vue'
import ActorView from '../views/ActorView.vue'
import DirectorsView from '../views/DirectorsView.vue'
import DirectorView from '../views/DirectorView.vue'

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
      path: '/movie/:id',
      name: 'movie',
      component: MovieView,
      props: true,
    },
    {
      path: '/genres',
      name: 'genres',
      component: GenresView,
    },
    {
      path: '/genre/:id',
      name: 'genre',
      component: GenreView,
      props: true,
    },
    {
      path: '/actors',
      name: 'actors',
      component: ActorsView,
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: ActorView,
      props: true,
    },
    {
      path: '/directors',
      name: 'directors',
      component: DirectorsView,
    },
    {
      path: '/director/:id',
      name: 'director',
      component: DirectorView,
      props: true,
    },
  ],
})

export default router
