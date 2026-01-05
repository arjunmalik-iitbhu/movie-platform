import { defineStore } from 'pinia'
import { config } from '../config'

interface Movie {
  name: string
  age: number
}

interface Data {
  movieList: Movie[]
}

interface Setting {
  navBarVisible: boolean
}

interface Info {
  setting: Setting
  data: Data
}

export const useInfoStore = defineStore('info', {
  state: (): Info => {
    return {
      setting: {
        navBarVisible: true,
      },
      data: {
        movieList: [],
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
      this.data.movieList = movies
    },
  },
})
