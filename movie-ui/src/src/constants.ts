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
  movieId: number
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

export type EntityInterface = Movie | Genre | Actor | Director | MovieRating

export const PAGE_LIMIT = 10

export const ADD_ENTITY_FIELDS: Record<ENTITY_TYPE, {prettyName: string, name: string, type: string, required: boolean}[]> = {
  movie: [
    {
      prettyName: "Title",
      name: "title",
      type: "string",
      required: true
    },
    {
      prettyName: "Release Year",
      name: "releaseYear",
      type: "number",
      required: true
    },
    {
      prettyName: "Image Source",
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  genre: [
    {
      prettyName: "Name",
      name: "name",
      type: "string",
      required: true
    },
    {
      prettyName: "Image Source",
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  actor: [
    {
      prettyName: "Name",
      name: "name",
      type: "string",
      required: true
    },
    {
      prettyName: "Image Source",
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  director: [
    {
      prettyName: "Name",
      name: "name",
      type: "string",
      required: true
    },
    {
      prettyName: "Image Source",
      name: "imageSrc",
      type: "string",
      required: false
    }
  ],
  rating: [
    {
      prettyName: "Comment",
      name: "comment",
      type: "string",
      required: true
    },
    {
      prettyName: "Story",
      name: "story",
      type: "number",
      required: false
    },
    {
      prettyName: "Direction",
      name: "direction",
      type: "number",
      required: false
    },
    {
      prettyName: "Acting",
      name: "acting",
      type: "number",
      required: false
    }
  ],
};

export const ADD_SUB_ENTITY_FIELDS: Record<ENTITY_TYPE, Record<ENTITY_TYPE, {prettyName: string, name: string, type: string, required: boolean}[]>> = {
  movie: {
    genre: [
      {
        prettyName: "Genre Id",
        name: "genre_id",
        type: "number",
        required: true
      }
    ],
    actor: [
      {
        prettyName: "Actor Id",
        name: "actor_id",
        type: "number",
        required: true
      }
    ],
    director: [
      {
        prettyName: "Director Id",
        name: "director_id",
        type: "number",
        required: true
      }
    ],
    rating: [
      {
        prettyName: "Comment",
        name: "comment",
        type: "string",
        required: true
      },
      {
        prettyName: "Story [0-5]",
        name: "story",
        type: "number",
        required: false
      },
      {
        prettyName: "Direction [0-5]",
        name: "direction",
        type: "number",
        required: false
      },
      {
        prettyName: "Acting [0-5]",
        name: "acting",
        type: "number",
        required: false
      }
    ],
    movie: []
  },
  genre: {
    genre: [],
    actor: [],
    director: [],
    rating: [],
    movie: []
  },
  actor: {
    genre: [],
    actor: [],
    director: [],
    rating: [],
    movie: []
  },
  director: {
    genre: [],
    actor: [],
    director: [],
    rating: [],
    movie: []
  },
  rating: {
    genre: [],
    actor: [],
    director: [],
    rating: [],
    movie: []
  }
};
