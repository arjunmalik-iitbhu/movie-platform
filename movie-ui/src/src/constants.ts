export const DEFAULT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cube_3d_in_sharp_solid_style.svg/1024px-Cube_3d_in_sharp_solid_style.svg.png'
export const MOVIE = 'movie'
export const GENRE = 'genre'
export const ACTOR = 'actor'
export const DIRECTOR = 'director'

export const ENTITIES = [MOVIE, GENRE, ACTOR, DIRECTOR] as const

export type ENTITY_TYPE = (typeof ENTITIES)[number]

export interface Movie {
  id: string
  title: string
  releaseYear: string
  imageSrc?: string
}

export interface Genre {
  id: string
  name: string
  imageSrc?: string
}

export interface Actor {
  id: string
  name: string
  imageSrc?: string
}

export interface Director {
  id: string
  name: string
  imageSrc?: string
}

export type EntityInterface = Movie | Genre | Actor | Director

export const PAGE_LIMIT = 10
