import { defineStore } from 'pinia'
import { config } from '../config'

interface Movie {
  name: string
  age: number
}

interface Data {
  movies: Movie[]
}

interface Setting {
  navBarVisible: boolean
}

interface Info {
  settings: Setting
  data: Data
}

export const useInfoStore = defineStore('info', {
  state: (): Info => {
    return {
      settings: {
        navBarVisible: true,
      },
      data: {
        movies: [],
      },
    }
  },
  actions: {
    async fetchMovies() {
      const resp = await fetch(`${config.API_BASE_URL}/movies`, {
        method: 'GET',
        headers: {},
      })
      if (!resp.ok) {
        throw new Error(`Error in fetchMovies. Response status: ${resp.status}`)
      }
      const movies: Movie[] = await resp.json()
      this.data.movies = movies
    },
    toggleNavBar() {
      this.settings.navBarVisible = !this.settings.navBarVisible;
    }
  },
})
