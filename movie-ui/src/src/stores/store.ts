import { defineStore } from 'pinia'
import { config } from '../config'
import type { ENTITY_TYPE, Movie, Genre, Actor, Director, EntityInterface } from '@/constants'
import { PAGE_LIMIT } from '@/constants'

interface Data {
  movies: Movie[]
  moviesmeta: {
    offset: number
    limit: number
  }
  genres: Genre[]
  genresmeta: {
    offset: number
    limit: number
  }
  actors: Actor[]
  actorsmeta: {
    offset: number
    limit: number
  }
  directors: Director[]
  directorsmeta: {
    offset: number
    limit: number
  }
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
        moviesmeta: { offset: 0, limit: PAGE_LIMIT },
        genres: [],
        genresmeta: { offset: 0, limit: PAGE_LIMIT },
        actors: [],
        actorsmeta: { offset: 0, limit: PAGE_LIMIT },
        directors: [],
        directorsmeta: { offset: 0, limit: PAGE_LIMIT },
      },
    }
  },
  actions: {
    async fetch(
      entity: ENTITY_TYPE,
      params?: {
        offset: number
        limit: number
        filters?: { entity: ENTITY_TYPE; value: string }[]
      },
    ) {
      const paramsVal = (params || this.data.moviesmeta) as {
        offset: number
        limit: number
        filters?: { entity: ENTITY_TYPE; value: string }[]
      }
      const urlBase = `${config.API_BASE_URL}/${entity}s`
      const url = new URL(urlBase)
      const processedparams = {
        offset: String(paramsVal.offset),
        limit: String(paramsVal.limit),
        ...(paramsVal?.filters?.reduce(
          (curr, elem) => Object.assign(curr, { [elem.entity]: elem.value }),
          {},
        ) || this.data.moviesmeta),
      }
      url.search = new URLSearchParams(processedparams).toString()
      const resp = await fetch(url, {
        method: 'GET',
        headers: {},
      })
      if (!resp.ok) {
        throw new Error(`Error in fetch ${entity}. Response status: ${resp.status}`)
      }
      const entities = await resp.json()
      Object.assign(this.data, { [`${entity}s`]: entities })
      Object.assign(this.data, {
        [`${entity}smeta`]: { offset: paramsVal.offset, limit: paramsVal.offset },
      })
    },
    async add(entity: ENTITY_TYPE, data: EntityInterface) {
      const resp = await fetch(`${config.API_BASE_URL}/${entity}s`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!resp.ok) {
        throw new Error(`Error in add ${entity}. Response status: ${resp.status}`)
      }
    },
    toggleNavBar() {
      this.settings.navBarVisible = !this.settings.navBarVisible
    },
  },
})
