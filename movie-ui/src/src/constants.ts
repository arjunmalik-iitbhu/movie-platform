export const DEFAULT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cube_3d_in_sharp_solid_style.svg/1024px-Cube_3d_in_sharp_solid_style.svg.png'
export const MOVIE = 'movie'
export const GENRE = 'genre'
export const ACTOR = 'actor'
export const DIRECTOR = 'director'
export const MOVIE_RATING = 'rating'

export const ENTITIES = [MOVIE, GENRE, ACTOR, DIRECTOR, MOVIE_RATING] as const

export type ENTITY_TYPE = (typeof ENTITIES)[number]

export interface MovieRating {
  id: string
  comment: string
  story: number
  direction: number
  acting: number
}

export interface Movie {
  id: number
  title: string
  releaseYear: number
  imageSrc?: string
  genres?: Genre[]
  actors?: Actor[]
  director?: Director
  ratings?: MovieRating[]
}

export interface Genre {
  id: number
  name: string
  imageSrc?: string
  movies?: Movie[]
}

export interface Actor {
  id: number
  name: string
  imageSrc?: string
  movies?: Movie[]
}

export interface Director {
  id: number
  name: string
  imageSrc?: string
  movies?: Movie[]
}

export type EntityInterface = Movie | Genre | Actor | Director

export const PAGE_LIMIT = 10
