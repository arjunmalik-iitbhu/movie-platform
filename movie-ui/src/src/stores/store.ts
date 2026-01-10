import { defineStore } from 'pinia'
import { config } from '../config'
import type { ENTITY_TYPE, Movie, Genre, Actor, Director, EntityInterface, MovieRating } from '@/constants'
import { PAGE_LIMIT } from '@/constants'

interface Data {
  allmovies: Record<string, Movie>
  movies: Movie[]
  moviesmeta: {
    offset: number
    limit: number
  }
  allgenres: Record<string, Genre>
  genres: Genre[]
  genresmeta: {
    offset: number
    limit: number
  }
  allactors: Record<string, Actor>
  actors: Actor[]
  actorsmeta: {
    offset: number
    limit: number
  }
  alldirectors: Record<string, Director>
  directors: Director[]
  directorsmeta: {
    offset: number
    limit: number
  }
  allratings: Record<string, MovieRating>
  ratings: MovieRating[]
  ratingsmeta: {
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
        allmovies: {},
        movies: [],
        moviesmeta: { offset: 0, limit: PAGE_LIMIT },
        allgenres: {},
        genres: [],
        genresmeta: { offset: 0, limit: PAGE_LIMIT },
        allactors: {},
        actors: [],
        actorsmeta: { offset: 0, limit: PAGE_LIMIT },
        alldirectors: {},
        directors: [],
        directorsmeta: { offset: 0, limit: PAGE_LIMIT },
        allratings: {},
        ratings: [],
        ratingsmeta: { offset: 0, limit: PAGE_LIMIT },
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
      const urlBase = `${config.API_BASE_URL}/version/v1/${entity}s`
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
      Object.assign(
        this.data,
        {
          [`all${entity}s`]: entities.reduce((c: EntityInterface, e: EntityInterface) => ({...c, [e.id]: e}), {} as EntityInterface)
        }
      )
      Object.assign(this.data, {
        [`${entity}smeta`]: { offset: paramsVal.offset, limit: paramsVal.limit },
      })
    },
    async fetchOne(entity: ENTITY_TYPE, params: {id: number}) {
      const elem = this.data[`all${entity}s`][params.id]
      if (elem) return elem;
      const urlBase = `${config.API_BASE_URL}/version/v1/${entity}/${params.id}`
      const url = new URL(urlBase)
      const resp = await fetch(url, {method: 'GET', headers: {}})
      if (!resp.ok) {
        throw new Error(`Error in fetch ${entity}. Response status: ${resp.status}`)
      }
      const fetchElem = await resp.json()
      Object.assign(
        this.data,
        {[`all${entity}s`]: {[fetchElem.id]: fetchElem}}
      )
      return fetchElem
    },
    async add(entity: ENTITY_TYPE, data: EntityInterface) {
      const resp = await fetch(`${config.API_BASE_URL}/version/v1/${entity}`, {
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
    async addSubEntity(entity: ENTITY_TYPE, subentity: ENTITY_TYPE, data: {entity_id: number, subentity_id: number}) {
      const resp = await fetch(`${config.API_BASE_URL}/version/v1/${entity}/${data.entity_id}/${subentity}`, {
        method: 'PUT',
        body: JSON.stringify({[`${subentity}Id`]: data.subentity_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!resp.ok) {
        throw new Error(`Error in add entity ${entity} subentity ${subentity}. Response status: ${resp.status}`)
      }
    },
    toggleNavBar() {
      this.settings.navBarVisible = !this.settings.navBarVisible
    },
  },
})
