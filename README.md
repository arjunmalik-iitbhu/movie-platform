# movie-platform

## Setup
```
ROOT_FOLDER=`pwd`

cd ${ROOT_FOLDER}/movie-ui
docker build .
docker run movie-ui

cd ${ROOT_FOLDER}/movie-api
docker build .
docker run movie-api

cd ${ROOT_FOLDER}/postgres
docker build .
docker run postgre

```


## Technical Details

```mermaid
---
title: Software Design
---
flowchart LR

A[movie-ui] -->|http| B(movie-api) --> C[postgres]
```

```mermaid
---
title: Data Model
---
erDiagram
    direction LR
    director ||--|{ movie : has
    director {
        bigserial id
        varchar name
        timestampz created_at
        timestampz updated_at
    }
    movie {
        bigserial id
        varchar name
        bigint director_id
        timestampz created_at
        timestampz updated_at
    }
    movie_to_actor ||--|{ movie : has
    movie_to_actor {
        bigserial id
        bigint movie_id
        bigint actor_id
        timestampz created_at
        timestampz updated_at
    }
    actor ||--|{ movie_to_actor : has
    actor {
        bigserial id
        varchar name
        timestampz created_at
        timestampz updated_at
    }
    movie_to_genre ||--|{ movie : has
    movie_to_genre {
        bigserial id
        bigint movie_id
        bigint genre_id
        timestampz created_at
        timestampz updated_at
    }
    genre ||--|{ movie_to_genre : has
    genre {
        bigserial id
        varchar name
        timestampz created_at
        timestampz updated_at
    }
```