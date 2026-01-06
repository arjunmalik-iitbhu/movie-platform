export const ENTITIES = ['movie', 'genre', 'actor', 'director'] as const;

export type ENTITY_TYPE = typeof ENTITIES[number];

export interface Movie {
  name: string
}

export interface Genre {
  name: string
}

export interface Actor {
  name: string
}

export interface Director {
  name: string
}

export const PAGE_LIMIT = 10;