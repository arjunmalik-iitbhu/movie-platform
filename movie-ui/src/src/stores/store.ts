import { defineStore } from 'pinia'
import { config } from '../config'
import type { ENTITY_TYPE, Movie, Genre, Actor, Director } from '@/constants'

interface Data {
  movies: Movie[]
  genres: Genre[]
  actors: Actor[]
  directors: Director[]
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
        genres: [],
        actors: [],
        directors: [],
      },
    }
  },
  actions: {
    async fetch(type: ENTITY_TYPE, params: {offset: number, limit: number, filters: {type: ENTITY_TYPE, value: string}[]}) {
      const urlBase = `${config.API_BASE_URL}/${type}s`
      const url = new URL(urlBase)
      const processedparams = {
        offset: String(params.offset),
        limit: String(params.limit),
        ...params.filters.reduce((curr, elem) => Object.assign(curr, {[elem.type]: elem.value}), {})
      }
      url.search = new URLSearchParams(processedparams).toString()
      const resp = await fetch(url, {
        method: 'GET',
        headers: {},
      })
      if (!resp.ok) {
        throw new Error(`Error in fetch ${type}. Response status: ${resp.status}`)
      }
      const entities = await resp.json()
      Object.assign(this.data, {[`${type}s`]: entities})
    },
    async add(type: ENTITY_TYPE, data: Movie | Genre | Actor | Director) {
      const resp = await fetch(`${config.API_BASE_URL}/${type}s`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!resp.ok) {
        throw new Error(`Error in add ${type}. Response status: ${resp.status}`)
      }
    },
    toggleNavBar() {
      this.settings.navBarVisible = !this.settings.navBarVisible
    }
  },
})
